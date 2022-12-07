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
})