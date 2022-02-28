let _objRegion
let _objProvinces
let _objMunicipality
let _objBarangay

const clearOptions = (...obj) => {
    if (obj instanceof Array) {
        obj.forEach(function (elem) {
            if (elem.length > 0) {
                for (let [index, item] of Object.entries(elem[0].options)) item.remove()
                elem[0].add(new Option("-- Please select --"));
            }
        })
    }
}

const onChangeElement = (elem) => {
    if (elem) {
        const regCode = elem.value.substring(0, 2)
        if (elem.dataset.level == "reg") {
            if (_objProvinces.length > 0) {
                _objProvinces[0].dataset.level = "prov"
                clearOptions(_objProvinces, _objMunicipality, _objBarangay)

                if (regCode) {
                    const populateOptions = (filteredData) => {
                        filteredData.forEach(function (prov) {
                            let isDefault = _objProvinces[0].dataset?.defaultValue == prov.code
                            _objProvinces[0].add(new Option(prov.name, prov.code, isDefault, isDefault))
                            if (isDefault) onChangeElement(_objProvinces[0])
                        })
                        _objProvinces[0].addEventListener('change', (e) => onChangeElement(e.target))
                    }
                    // populate for province/district
                    PSGC.get(regCode, { geographic_level: 'Prov' }).then(outData => {
                        if (outData.length == 0) {
                            PSGC.get(regCode, { geographic_level: 'Dist' }).then(inData => populateOptions(inData))
                        } else {
                            populateOptions(outData)
                        }
                    })

                }
            }
        } else if (elem.dataset.level == "prov") {
            if (_objMunicipality.length > 0) {
                _objMunicipality[0].dataset.level = "Mun"

                PSGC.get(regCode, {
                    search: {
                        code: elem.value,
                        type: 'Mun'
                    }
                }).then(iData => {
                    clearOptions(_objMunicipality, _objBarangay)
                    if (iData.length) {
                        iData.forEach(function (item) {
                            let isDefault = _objMunicipality[0].dataset?.defaultValue == item.code
                            _objMunicipality[0].add(new Option(item.name, item.code, isDefault, isDefault))
                            if (isDefault) onChangeElement(_objMunicipality[0])
                        })
                        _objMunicipality[0].addEventListener('change', (e) => onChangeElement(e.target))
                    }
                })
            }
        } else if (elem.dataset.level == "Mun") {
            if (_objBarangay.length > 0) {
                _objBarangay[0].dataset.level = "Bgy"

                PSGC.get(regCode, {
                    search: {
                        code: elem.value,
                        type: 'Bgy'
                    }
                }).then(mData => {
                    clearOptions(_objBarangay)
                    if (mData.length) {
                        mData.forEach(function (item) {
                            let isDefault = _objBarangay[0].dataset?.defaultValue == item.code
                            _objBarangay[0].add(new Option(item.name, item.code, isDefault, isDefault))
                            if (isDefault) onChangeElement(_objBarangay[0])
                        })
                    }
                })
            }
        }
    }
}

const PSGC = {
    /**
     * 
     * @param {object} options Required. Options for initializing psgc
     */
    init: (options) => {
        if (options && options.bind) {
            _objRegion = document.querySelectorAll(options.bind?.region)
            _objProvinces = document.querySelectorAll(options.bind?.province)
            _objMunicipality = document.querySelectorAll(options.bind?.municipality)
            _objBarangay = document.querySelectorAll(options.bind?.barangay)

            clearOptions(_objRegion, _objProvinces, _objMunicipality, _objBarangay)

            // TODO support incomplete bindings like province & municipality only, etc
            // const allRegions = PSGC.getAllRegions()
            PSGC.getAllRegions().then(allRegions => {
                _objRegion.forEach(function (elem) {
                    let regDefaultValue = elem.dataset?.defaultValue
                    // attributes
                    elem.dataset.level = "reg"
                    allRegions.forEach(function (item, index) {
                        let isDefault = regDefaultValue == item.code
                        elem.add(new Option(item.name, item.code, isDefault, isDefault));
                        if (isDefault) onChangeElement(elem)
                    })
                    elem.addEventListener('change', (e) => onChangeElement(e.target))
                })
            })
        }
    },
    getAllRegions: () => {
        // const content = require('./extract/geo-data.json')
        let geoData = import('./extract/geo-regions.json')
        // let fOutput = []
        // for (let [index, item] of Object.entries(geoData)) {
        //     if (item.geographic_level) {
        //         fOutput.push(item)
        //     }
        // }

        // fOutput.sort((a, b) => parseInt(a.code) - parseInt(b.code))
        // return fOutput;

        return geoData.then(data => {
            let fOutput = []
            for (let [index, item] of Object.entries(data)) {
                if (item.geographic_level) {
                    fOutput.push(item)
                }
            }

            fOutput.sort((a, b) => parseInt(a.code) - parseInt(b.code))
            return Promise.resolve(fOutput)
        })
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

// module.exports = PSGC
export default PSGC