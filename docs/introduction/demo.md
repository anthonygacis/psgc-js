<script setup>
    import PSGC from "../../src/index.js"
    import pkg from '../../package.json'
    import Demo from "./Demo.vue"
    import Version from "./Version.vue"
</script>

# Introduction

A collection of philippine geographic data based on PSGC

<Version />

## Demo

<Demo/>

```html
<!-- HTML Markup -->
<select id="regions"></select>
<select id="provinces"></select>
<select id="municipality"></select>
<select id="barangay"></select>
```

```js
PSGC.init({
    bind: {
        region: "#regions",
        province: "#provinces",
        municipality: "#municipality",
        barangay: "#barangay",
    }
})
```

## Features

- New PSGC 10-digit code
- Collection of geographic data
  - Barangay
  - City
  - District
  - Municipality
  - Sub Municipality
  - Province
  - Region
- Other information such as:
  - Old names (if available)
  - Income Classification
  - Urban / Rural (based on 2015 population)
  - Population (2020)
