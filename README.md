# PSGC JS

A collection of philippine geographic data based on PSGC

## Latest Update

As of **2Q 2021**

## Features

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

## Installation

Install psgs-js with npm

```bash
  npm install psgc-js
```

## Usage

### Method: getAllRegions()

A method that returns all regions in the Philippines

```js
// example.js
import {getAllRegions} from '@ageesea/psgc-js'

const allRegions = getAllRegions()
```

Output:

```obj
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

### Method: getWithFilters(region, filters)

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td> region </td>
    <td> Region code (refer to <a href="#region-code-reference">Region Code Reference</a>
    </td>
  </tr>
  <tr>
    <td> filters </td>
    <td>
      A filter object
      <pre>
{
  // available values: <i>Prov, Dist, Mun, SubMun and Bgy</i>
  geographic_level: "value"
}  
      </pre>
    </td>
  </tr>
</table>

```js
// example.js
import {getWithFilters} from '@ageesea/psgc-js'

const output = getWithFilters({
  geographic_level: "Prov"
})
```

Output:

```obj
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

### Region Code Reference

You can all also get the region code by taking the first two digits of the code. Example "050000000" for Bicol, the Region code will be "05"

<table>
<tr>
<th>Code</td>
<th>Region</td>
</tr>
<tr>
<td>01</td>
<td>Region I</td>
</tr>
<tr>
<td>02</td>
<td>Region II</td>
</tr>
<tr>
<td>03</td>
<td>Region III</td>
</tr>
<tr>
<td>04</td>
<td>Region IV-A</td>
</tr>
<tr>
<td>05</td>
<td>Region V</td>
</tr>
<tr>
<td>06</td>
<td>Region VI</td>
</tr>
<tr>
<td>07</td>
<td>Region VII</td>
</tr>
<tr>
<td>08</td>
<td>Region VIII</td>
</tr>
<tr>
<td>09</td>
<td>Region IX</td>
</tr>
<tr>
<td>10</td>
<td>Region X</td>
</tr>
<tr>
<td>11</td>
<td>Region XI</td>
</tr>
<tr>
<td>12</td>
<td>Region XII</td>
</tr>
<tr>
<td>13</td>
<td>NCR</td>
</tr>
<tr>
<td>14</td>
<td>CAR</td>
</tr>
<tr>
<td>15</td>
<td>ARMM</td>
</tr>
<tr>
<td>16</td>
<td>Region XIII</td>
</tr>
<tr>
<td>17</td>
<td>MIMAROPA</td>
</tr>
</table>
