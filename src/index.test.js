/**
 * @jest-environment jsdom
 */
const { psgc } = require('.')

test('has an object', () => {
    expect(psgc().getAllRegions().length).toBeGreaterThan(0)
});