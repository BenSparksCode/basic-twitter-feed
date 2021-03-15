const User = require('../classes/User')
const Tweet = require('../classes/Tweet')

const {
    convertStringsToUsers,
    convertStringsToTweets,
    logServerData
} = require('../utils/utils')


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


