/**
 * @jest-environment jsdom
 */
import PSGC from '../src/index'

test('has an object', () => {
    expect(PSGC.getAllRegions().length).toBeGreaterThan(0)
});