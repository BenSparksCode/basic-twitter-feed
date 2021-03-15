const User = require('../classes/User')

test('Basic User object', () => {
    const testData = new User('Bob', ['Mary'])
    expect(testData.name).toBe('Bob')
    expect(testData.follows).toEqual(['Mary'])
})