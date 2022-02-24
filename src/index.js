const psgc = () => {
    const getAllRegions = () => {
        let data = require('./extract/geo-data.json')
        return data.filter((item) => {
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
        let content = require(`./extract/geo-reg-${parseInt(region)}.json`);
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
                                        results.push(bgyValue)
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

    return {
        getAllRegions, getWithFilters
    }
}

module.exports = exports = { psgc }