const { mapKeys } = require('lodash');
const xlsx = require('xlsx');
const fs = require('fs');

const wb = xlsx.readFile('./src/data/PSGC-4Q-2022.xlsx');
const ws = wb.Sheets['PSGC'];
const data = xlsx.utils.sheet_to_json(ws).map(row => mapKeys(row, (value, key) => {
    return key.toLowerCase().replace(/ /g, '_');
}));
let regions = {}
let sgus = {}
for (let index = 1; index <= 19; index++) {
    let fData = {}
    let regData = data.filter((item) => {
        // only those entries with correspondence code
        if (item.code || item.correspondence_code) {
            let numCode = index != '13' ? parseInt(item.code) : parseInt(item.correspondence_code)
            let multiplier = 100000000
            if (index == 13) multiplier = 10000000
            let regCode = index * multiplier
            if (numCode >= regCode && numCode < (regCode + multiplier)) {
                item.name = item.name.trim()
                if (item.geographic_level) {
                    let code = index != 13 ? item.code.toString() : item.correspondence_code.toString()
                    let tempCode = ''
                    if (item.geographic_level == 'Reg') {
                        tempCode = code.substring(0, 3)
                        regions[tempCode] = {
                            ...item
                        }
                    }
                    if (item.geographic_level == 'SGU') {
                        tempCode = item.code.toString()
                        sgus[tempCode] = {
                            ...item
                        }
                    }
                    if (item.geographic_level == 'Prov' || item.geographic_level == 'Dist') {
                        tempCode = code.substring(0, 5)
                    }
                    if (item.geographic_level == 'Mun' || item.geographic_level == 'City' || item.geographic_level == 'SubMun') {
                        tempCode = code.substring(0, 7)
                    }
                    if (item.geographic_level == 'Bgy') {
                        tempCode = code
                    }
                    if (!(tempCode in fData) && tempCode) {
                        fData[tempCode] = {
                            ...item
                        }
                    }
                }
                return item
            }
        }

        return false
    })
    fs.writeFileSync('./src/extract/geo-reg-' + index + '.json', JSON.stringify(fData, null, 4));
}
fs.writeFileSync('./src/extract/geo-regions.json', JSON.stringify(regions, null, 4));
fs.writeFileSync('./src/extract/geo-sgus.json', JSON.stringify(sgus, null, 4));
console.log('Extraction complete')
console.log('Geo Data has been saved to ./extract directory')