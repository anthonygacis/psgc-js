const fs = require('fs');
let content = JSON.parse(fs.readFileSync('./src/extract/geo-data.json', 'utf8'));

const getAll = () => content
content.filter((item) => {
    // if (item.income_classification) {
    //     return item.income_classification.includes('1st')
    // }

    // return false;
    return item.old_names
})

module.exports = exports = { getAll }