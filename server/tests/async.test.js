const {
    getStringArrayFromFile
} = require('../utils/utils')

test('Importing text from test.txt', async () => {
    // Tests if the async import of lines from text file into a string array works
    const testData = await getStringArrayFromFile('test.txt')
    const expectedResult = [
        'Line 1',
        '',
        'Blank above',
        'Line 4',
    ]
    expect(testData).toEqual(expectedResult);
})