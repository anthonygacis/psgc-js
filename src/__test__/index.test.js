import { describe, expect, test } from "vitest";
import PSGC from '../index'

describe("psgc-js", () => {
    test('getAllRegion should return 17 regions', async () => {
        let data = await PSGC.getAllRegions()
        expect(data.length).toEqual(17)
    });

    test('get should return sorsogon data', async () => {
        let data = await PSGC.get("05", {
            geographic_level: "Prov"
        })

        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    code: '0506200000',
                    name: 'Sorsogon',
                    correspondence_code: '056200000'
                })
            ])
        );
    });

    test('ncr should contain cities', async () => {
        let data = await PSGC.get("13", {
            geographic_level: "Dist"
        })
        expect(data.length).toBeGreaterThan(0)
    });

    test('ncr should contain first district', async () => {
        let data = await PSGC.get("13", {
            geographic_level: "Dist"
        })
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    correspondence_code: 133900000,
                    name: 'NCR, City of Manila, First District (Not a Province)',
                    geographic_level: 'Dist'
                })
            ])
        );
    });

    test('ncr first district should contain city of manila', async () => {
        let data = await PSGC.get("13", {
            search: {
                code: '13390',
                type: 'Mun'
            }
        })
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    correspondence_code: 133900000,
                    name: 'City of Manila',
                    geographic_level: 'City'
                })
            ])
        );
    });
})