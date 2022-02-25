const PSGC = {
    /**
     * 
     * @param {object} options Required. Options for initializing psgc
     */
    init: (options) => {
        if (options && options.bind && options.bind.region && options.bind.province && options.bind.municipality) {
            let objRegion = document.querySelectorAll(options.bind.region)
            let objProvinces = document.querySelectorAll(options.bind.province)
            let objMunicipality = document.querySelectorAll(options.bind.municipality)

            const allRegions = PSGC.getAllRegions()

            objRegion.forEach(function (elem) {
                // attributes
                elem.dataset.level = "reg"
                let emp = document.createElement("option")
                emp.text = "-- Please select a value --"
                elem.add(emp);
                allRegions.forEach(function (item, index) {
                    elem.add(new Option(item.name, item.code));
                })
                elem.addEventListener('change', function (e) {
                    if (e.target) {
                        if (e.target.dataset.level = "reg") {
                            if (objProvinces) {
                                const regCode = e.target.value.substring(0, 2)
                                objProvinces[0].dataset.level = "prov"
                                // clear
                                var options = objProvinces[0].options;
                                for (let [index, item] of Object.entries(options)) {
                                    item.remove()
                                }
                                // add empty option
                                let emp = document.createElement("option")
                                emp.text = "-- Please select a value --"
                                objProvinces[0].add(emp);
                                if (regCode) {
                                    let filteredData = PSGC.get(regCode, { geographic_level: 'Prov' })
                                    if (!filteredData.length) filteredData = PSGC.get(regCode, { geographic_level: 'Dist' })
                                    filteredData.forEach(function (prov) {
                                        objProvinces[0].add(new Option(prov.name, prov.code))
                                    })
                                    objProvinces[0].addEventListener('change', function (elemMItem) {
                                        if (objMunicipality) {
                                            objMunicipality[0].dataset.level = "Mun"

                                        }
                                    })
                                }
                            }
                        }
                    }
                })
            })
        }
    },
    getAllRegions: () => {
        let data = require('./extract/geo-data.json')
        return data.filter((item) => {
            if (item.geographic_level) {
                return item.geographic_level.includes('Reg')
            }
        }).sort((a, b) => parseInt(a.code) - parseInt(b.code))
    },

    /**
     * 
     * @param {string} region region code
     * @param {string} filters filter options
     */
    get: (region, filters) => {
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
}

module.exports = exports = PSGC