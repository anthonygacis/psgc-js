<script setup>
    import GeographicLevel from "./components/GeographicLevel.vue"
</script>

# Using Geographic Level Option

## Retrieve all provinces from a region

<GeographicLevel geo-code="05" type="prov"/>

```js
// example code
let provinces = await PSGC.get("05", {
    geographic_level: "Prov"
})
```

```json
// json structure
[
    {
        "code":"0500500000",
        "correspondence_code":"050500000",
        "geographic_level":"Prov",
        "income_classification":"1st",
        "name":"Albay",
        "population_2015":1314826,
        "population_2020":1374768,
        "urban_rural":""
    },
    ...
]
```

## Retrieve all cities from a region

<GeographicLevel geo-code="05" type="city"/>

```js
// example code
let provinces = await PSGC.get("05", {
    geographic_level: "City"
})
```

```json
// json structure
[
    {
        "city_class":"CC",
        "code":"0501716000",
        "correspondence_code":"051716000",
        "geographic_level":"City",
        "income_classification":"4th",
        "name":"City of Iriga",
        "population_2015":111757,
        "population_2020":114457,
        "urban_rural":""
    },
    ...
]
```
