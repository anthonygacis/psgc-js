import geoData from './extract/geo-data.json'

const PSGC = {
    /**
     * 
     * @param {object} options Required. Options for initializing psgc
     */
    init: (options) => {
        if (options && options.bind) {
            let objRegion = document.querySelectorAll(options.bind?.region)
            let objProvinces = document.querySelectorAll(options.bind?.province)
            let objMunicipality = document.querySelectorAll(options.bind?.municipality)
            let objBarangay = document.querySelectorAll(options.bind?.barangay)

            const clearOptions = (obj) => {
                if (obj.length > 0) {
                    for (let [index, item] of Object.entries(obj[0].options)) item.remove()

                    obj[0].add(new Option("-- Please select --"));
                }
            }

            clearOptions(objRegion)
            clearOptions(objProvinces)
            clearOptions(objMunicipality)
            clearOptions(objBarangay)

            const allRegions = PSGC.getAllRegions()

            objRegion.forEach(function (elem) {
                // attributes
                elem.dataset.level = "reg"
                allRegions.forEach(function (item, index) {
                    elem.add(new Option(item.name, item.code));
                })
                elem.addEventListener('change', function (e) {
                    if (e.target) {
                        if (e.target.dataset.level = "reg") {
                            if (objProvinces.length > 0) {
                                const regCode = e.target.value.substring(0, 2)
                                objProvinces[0].dataset.level = "prov"

                                clearOptions(objProvinces)
                                clearOptions(objMunicipality)
                                clearOptions(objBarangay)

                                if (regCode) {
                                    const populateOptions = (filteredData) => {
                                        filteredData.forEach(function (prov) {
                                            objProvinces[0].add(new Option(prov.name, prov.code))
                                        })
                                        objProvinces[0].addEventListener('change', function (elemMItem) {
                                            if (objMunicipality.length > 0) {
                                                objMunicipality[0].dataset.level = "Mun"

                                                PSGC.get(regCode, {
                                                    search: {
                                                        code: elemMItem.target.value,
                                                        type: 'Mun'
                                                    }
                                                }).then(iData => {
                                                    clearOptions(objMunicipality)
                                                    clearOptions(objBarangay)

                                                    if (iData.length) {
                                                        iData.forEach(function (item) {
                                                            objMunicipality[0].add(new Option(item.name, item.code))
                                                        })
                                                        objMunicipality[0].addEventListener('change', function (mElement) {
                                                            if (objBarangay.length > 0) {
                                                                objBarangay[0].dataset.level = "Bgy"

                                                                PSGC.get(regCode, {
                                                                    search: {
                                                                        code: mElement.target.value,
                                                                        type: 'Bgy'
                                                                    }
                                                                }).then(mData => {
                                                                    clearOptions(objBarangay)

                                                                    if (mData.length) {
                                                                        mData.forEach(function (item) {
                                                                            objBarangay[0].add(new Option(item.name, item.code))
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    PSGC.get(regCode, { geographic_level: 'Prov' }).then(outData => {
                                        if (outData.length == 0) {
                                            PSGC.get(regCode, { geographic_level: 'Dist' }).then(inData => populateOptions(inData))
                                        } else {
                                            populateOptions(outData)
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
        // const content = require('./extract/geo-data.json')
        return geoData.filter((item) => {
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
    get: (regionCode, filters) => {
        if (filters && filters.search) {
            // let data = require(`./extract/geo-reg-${parseInt(regionCode)}.json`)
            let data = import(`./extract/geo-reg-${parseInt(regionCode)}.json`)
            return data.then(content => {
                let code = filters.search.code
                let type = filters.search.type
                let provCode = code.substring(0, 4)
                let munCode = code.substring(0, 6)
                let res = []
                if (type == 'City' || type == 'Mun' || type == 'SubMun') {
                    for (let [index, item] of Object.entries(content)) {
                        if (item.geographic_level) {
                            if (item.geographic_level == 'City' || item.geographic_level == 'Mun' || item.geographic_level == 'SubMun') {
                                if (item.code.toString().startsWith(provCode)) {
                                    res.push(item)
                                }
                            }
                        }
                    }
                }
                else if (type == 'Bgy') {
                    for (let [index, item] of Object.entries(content)) {
                        if (item.geographic_level) {
                            if (item.geographic_level == 'Bgy') {
                                if (item.code.toString().startsWith(munCode)) {
                                    res.push(item)
                                }
                            }
                        }
                    }
                }

                return Promise.resolve(res)
            })
        } else {
            // let content = require(`./extract/geo-reg-${parseInt(regionCode)}.json`);
            let res = import(`./extract/geo-reg-${parseInt(regionCode)}.json`)
            return res.then(content => {
                let tempRes = []
                for (let [key, value] of Object.entries(content)) {
                    if (value.geographic_level == filters.geographic_level) {
                        tempRes.push(value)
                    }
                }
                return Promise.resolve(tempRes)
            })
        }
    }
}

// module.exports = exports = PSGC
export default PSGC