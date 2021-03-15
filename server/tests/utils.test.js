const User = require('../classes/User')
const Tweet = require('../classes/Tweet')

const {
    convertStringsToUsers,
    convertStringsToTweets,
    logServerData
} = require('../utils/utils')


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