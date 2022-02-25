/**
 * @jest-environment jsdom
 */
const PSGC = require('.')

test('has an object', () => {
    expect(PSGC.getAllRegions().length).toBeGreaterThan(0)
});