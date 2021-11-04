const { mapKeys } = require('lodash');
const xlsx = require('xlsx');
const fs = require('fs');

const wb = xlsx.readFile('./PSGC-2Q-2021.xlsx');
const ws = wb.Sheets['PSGC'];
const data = xlsx.utils.sheet_to_json(ws).map(row => mapKeys(row, (value, key) => {
    return key.toLowerCase().replace(' ', '_');
}));
fs.writeFileSync('./src/extract/geo-data.json', JSON.stringify(data, null, 4));
console.log('Build completed')
console.log('Geo Data has been saved to ./geo-data.json')