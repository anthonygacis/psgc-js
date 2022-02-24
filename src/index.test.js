/**
 * @jest-environment jsdom
 */
const { getAll } = require('.')

test('has an object', () => {
    expect(getAll().length).toBeGreaterThan(0)
});