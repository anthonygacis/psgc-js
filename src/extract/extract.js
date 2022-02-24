const { mapKeys } = require('lodash');
const xlsx = require('xlsx');
const fs = require('fs');

const wb = xlsx.readFile('./PSGC-2Q-2021.xlsx');
const ws = wb.Sheets['PSGC'];
const data = xlsx.utils.sheet_to_json(ws).map(row => mapKeys(row, (value, key) => {
    return key.toLowerCase().replace(' ', '_');
}));
for (let index = 1; index <= 17; index++) {
    let fData = {}

    let regData = data.filter((item) => {
        let numCode = parseInt(item.code)
        let regCode = index * 10000000
        if (numCode >= regCode && numCode < (regCode + 10000000)) {
            if (item.geographic_level) {
                let code = item.code.toString()
                let regCode = code.substring(0, 2)
                if (item.geographic_level == 'Reg') {
                    if (!(regCode in fData)) {
                        fData[regCode] = {
                            ...item,
                            sub_locations: {}
                        }
                    }
                }
                if (item.geographic_level == 'Prov' || item.geographic_level == 'Dist') {
                    let provCode = code.substring(2, 4)
                    if (regCode in fData) {
                        if (!(provCode in fData[regCode].sub_locations)) {
                            fData[regCode].sub_locations[provCode] = {
                                ...item,
                                sub_locations: {}
                            }
                        }
                    }
                }
                if (item.geographic_level == 'Mun' || item.geographic_level == 'City' || item.geographic_level == 'SubMun') {
                    let provCode = code.substring(2, 4)
                    let munCode = code.substring(4, 6)
                    if (regCode in fData && provCode in fData[regCode].sub_locations) {
                        if (!(munCode in fData[regCode].sub_locations[provCode].sub_locations)) {
                            fData[regCode].sub_locations[provCode].sub_locations[munCode] = {
                                ...item,
                                sub_locations: {}
                            }
                        }
                    }
                }
                if (item.geographic_level == 'Bgy') {
                    let provCode = code.substring(2, 4)
                    let munCode = code.substring(4, 6)
                    let bgyCode = code.substring(6)
                    if (regCode in fData && provCode in fData[regCode].sub_locations && munCode in fData[regCode].sub_locations[provCode].sub_locations) {
                        if (!(bgyCode in fData[regCode].sub_locations[provCode].sub_locations[munCode].sub_locations)) {
                            fData[regCode].sub_locations[provCode].sub_locations[munCode].sub_locations[bgyCode] = {
                                ...item
                            }
                        }
                    }
                }
            }
            return item
        }
        return false
    })
    // console.log(fData)
    fs.writeFileSync('./src/extract/geo-reg-' + index + '.json', JSON.stringify(fData, null, 4));
}
// fs.writeFileSync('./src/extract/geo-data.json', JSON.stringify(data, null, 4));
console.log('Extraction completed')
console.log('Geo Data has been saved to ./extract directory')