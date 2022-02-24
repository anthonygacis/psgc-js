const fs = require('fs');
const { filter } = require('lodash');

const getAllRegions = () => {
    let content = JSON.parse(fs.readFileSync(`./src/extract/geo-data.json`, 'utf8'));
    return content.filter((item) => {
        if (item.geographic_level) {
            return item.geographic_level.includes('Reg')
        }
    })
}

/**
 * 
 * @param {string} region region code
 * @param {string} filters filter options
 */
const getWithFilters = (region, filters) => {
    let content = JSON.parse(fs.readFileSync(`./src/extract/geo-reg-${parseInt(region)}.json`, 'utf8'));
    let results = []
    for (let [key, value] of Object.entries(content)) {
        if (value.geographic_level == 'Reg') {
            for (let [innerKey, innerValue] of Object.entries(value.sub_locations)) {
                if (filters && filters.geographic_level && innerValue.geographic_level == filters.geographic_level) {
                    delete innerValue.sub_locations
                    results.push(innerValue)
                } else {
                    for (let [munKey, munValue] of Object.entries(innerValue.sub_locations)) {
                        if (filters && filters.geographic_level && munValue.geographic_level == filters.geographic_level) {
                            delete munValue.sub_locations
                            results.push(munValue)
                        } else {
                            for (let [bgyKey, bgyValue] of Object.entries(munValue.sub_locations)) {
                                if (filters && filters.geographic_level && bgyValue.geographic_level == filters.geographic_level) {
                                    delete bgyValue.sub_locations
                                    results.push(bgyValue)
                                } else {

                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return results
}

module.exports = exports = {
    getWithFilters
}