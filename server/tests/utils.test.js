const User = require('../classes/User')
const Tweet = require('../classes/Tweet')

const {
    convertStringsToUsers,
    convertStringsToTweets,
} = require('../utils/utils')

// ----------------------------
// convertStringsToUsers Tests:
// ----------------------------

test('Basic single follow line', () => {
    const testData = [
        'Bob follows Jay'
    ]
    const expectedResult = [
        new User('Bob', ['Jay']),
        new User('Jay', []),
    ]
    expect(convertStringsToUsers(testData)).toEqual(expectedResult);
})

test('Blank lines only', () => {
    const testData = [
        '',''
    ]
    const expectedResult = []
    expect(convertStringsToUsers(testData)).toEqual(expectedResult);
})

test('Blank lines within full lines', () => {
    // Expected to skip empty lines
    const testData = [
        'Bob follows Jay', '','',
        'Jay follows Kat'
    ]
    const expectedResult = [
        new User('Bob', ['Jay']),
        new User('Jay', ['Kat']),
        new User('Kat', []),
    ]
    expect(convertStringsToUsers(testData)).toEqual(expectedResult);
})

test('Complex follows', () => {
    const testData = [
        'Bob follows Jay, Kat, Sam',
        'Jay follows Kat',
        'Sam follows Jay, Bob'
    ]
    const expectedResult = [
        new User('Bob', ['Jay','Kat','Sam']),
        new User('Jay', ['Kat']),
        new User('Sam', ['Jay','Bob']),
        new User('Kat', []),
    ]
    expect(convertStringsToUsers(testData)).toEqual(expectedResult);
})

test('Complex follows with errors', () => {
    const testData = [
        'Bob follows Jay, Kat, , Sam', //Should skip blank and trim ' Sam'
        'Jay follows Kate', //Should add Kate as well as Kat (misspelt)
        'Sam follow Jay, Bob' //Should scrap this line because 'follow' not 'follows'
    ]
    const expectedResult = [
        new User('Bob', ['Jay','Kat','Sam']),
        new User('Jay', ['Kate']),
        new User('Kat', []),
        new User('Sam', []),
        new User('Kate', []),
    ]
    expect(convertStringsToUsers(testData)).toEqual(expectedResult);
})

// ----------------------------
// convertStringsToTweets Tests:
// ----------------------------

test('Basic single tweet', () => {
    const testData = [
        'Bob> Hello World.'
    ]
    const expectedResult = [
        new Tweet('Bob', 'Hello World.')
    ]
    expect(convertStringsToTweets(testData)).toEqual(expectedResult);
})

test('Blank tweets only', () => {
    const testData = [
        '',''
    ]
    const expectedResult = []
    console.log(convertStringsToTweets(testData));
    expect(convertStringsToTweets(testData)).toEqual(expectedResult);
})

test('Blank lines within full lines', () => {
    // Expected to skip empty lines
    const testData = [
        'Bob> Hello World.', '','',
        'Jay> U up?'
    ]
    const expectedResult = [
        new Tweet('Bob', 'Hello World.'),
        new Tweet('Jay', 'U up?')
    ]
    expect(convertStringsToTweets(testData)).toEqual(expectedResult);
})

test('Complex chars in Tweets', () => {
    const testData = [
        'Bob> Hello World.#@#%^%(!&@#)&(":{}<>?',
        'Jay> \n',
        'Joe> 汉字/漢字'
    ]
    const expectedResult = [
        new Tweet('Bob', 'Hello World.#@#%^%(!&@#)&(":{}<>?'),
        new Tweet('Jay', '\n'),
        new Tweet('Joe', '汉字/漢字')
    ]
    expect(convertStringsToTweets(testData)).toEqual(expectedResult);
})

test('Complex Tweets with errors', () => {
    const testData = [
        '> How do I change my name?', //User = '' = skipped
        'Jay>', //Should not create Tweet - malformed in text file
        'Joe> one > two' //Text = 'one > two'
    ]
    const expectedResult = [
        new Tweet('Joe', 'one > two')
    ]
    expect(convertStringsToTweets(testData)).toEqual(expectedResult);
})
