# Available Methods

::: warning Note!
All methods return a `Promise` type, just use `async-await`
:::

## PSGC.getAllRegions()

A method that returns all regions in the Philippines

```js
// example.js
import PSGC from '@ageesea/psgc-js'

const allRegions = PSGC.getAllRegions()
```

Output:

```json
[
    {
        code: 100000000,
        name: 'Region X (Northern Mindanao)',
        geographic_level: 'Reg',
        population_2015: 4689302,
        population_2020: 5022768
    },
    {
        code: 110000000,
        name: 'Region XI (Davao Region)',
        geographic_level: 'Reg',
        population_2015: 4893318,
        population_2020: 5243536
    },
    ...
]
```

## PSGC.get(region, filters)

### region

Region code (refer to <a href="/api/code-reference#region-codes">Region Code Reference</a>

### filters

```json
// A filter object
{
    // available values: Prov, Dist, Mun, SubMun and Bgy
    geographic_level: "value"
    search: {
        code: "geo code",
        type: 'value'
    }
}
```

```js
// example.js
import PSGC from '@ageesea/psgc-js'

// to get all of the region V provinces
const output = PSGC.get("05", {
    geographic_level: "Prov"
})

// To get the municipality from a particular province, supply the search option
const output = PSGC.get("05", {
    search: {
        code: "056200000", // the geo code of the province. e.g. Sorsogon
        type: 'Mun' // same as the previously mentioned values
    }
})
```

Sample Output:

```json
[
    {
        code: '051600000',
        name: 'Camarines Norte',
        geographic_level: 'Prov',
        income_classification: '2nd',
        population_2015: 583313,
        population_2020: 629699
    },
    {
        code: '051700000',
        name: 'Camarines Sur',
        geographic_level: 'Prov',
        income_classification: '1st',
        population_2015: 1952544,
        population_2020: 2068244
    },
    ...
]
```
