const { mapKeys } = require('lodash');
const xlsx = require('xlsx');
const fs = require('fs');

const wb = xlsx.readFile('./PSGC-4Q-2021.xlsx');
const ws = wb.Sheets['PSGC'];
const data = xlsx.utils.sheet_to_json(ws).map(row => mapKeys(row, (value, key) => {
    return key.toLowerCase().replace(/ /g, '_');
}));
let regions = {}
let sgus = {}
for (let index = 1; index <= 17; index++) {
    let fData = {}
    let regData = data.filter((item) => {
        // only those entries with correspondence code
        if (item.code) {
            let numCode = parseInt(item.code)
            let regCode = index * 10000000
            if (numCode >= regCode && numCode < (regCode + 10000000)) {
                if (item.geographic_level) {
                    let code = item.code.toString()
                    let tempCode = ''
                    if (item.geographic_level == 'Reg') {
                        tempCode = code.substring(0, 2)
                        regions[tempCode] = {
                            ...item
                        }
                    }
                    if (item.geographic_level == 'Prov' || item.geographic_level == 'Dist') {
                        tempCode = code.substring(0, 4)
                    }
                    if (item.geographic_level == 'Mun' || item.geographic_level == 'City' || item.geographic_level == 'SubMun') {
                        tempCode = code.substring(0, 6)
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
        } else {
            if (item.geographic_level == 'SGU') {
                tempCode = item.psgc_10_digit.toString()
                sgus[tempCode] = {
                    ...item
                }
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