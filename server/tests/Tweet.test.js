const Tweet = require('../classes/Tweet')

test('Basic Tweet object', () => {
    const testData = new Tweet('Bob', 'Hey everybody!')
    expect(testData.user).toBe('Bob')
    expect(testData.text).toBe('Hey everybody!')
})

test('Blank Tweet object', () => {
    const testData = new Tweet()
    expect(testData.user).toBe(undefined)
    expect(testData.text).toBe(undefined)
})

test('Empty string Tweet object', () => {
    const testData = new Tweet('','')
    expect(testData.user).toBe('')
    expect(testData.text).toBe('')
})