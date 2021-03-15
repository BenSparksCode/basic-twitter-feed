const User = require('../classes/User')

test('Basic User object', () => {
    const testData = new User('Bob', ['Mary'])
    expect(testData.name).toBe('Bob')
    expect(testData.follows).toEqual(['Mary'])
})

test('Blank User object', () => {
    const testData = new User()
    expect(testData.name).toBe('Anon')
    expect(testData.follows).toEqual([])
})

test('Empty string User object', () => {
    const testData = new User('','')
    expect(testData.name).toBe('Anon')
    expect(testData.follows).toEqual([])
})