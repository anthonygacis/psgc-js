# Get Started

Install psgs-js with npm

```bash
npm install @ageesea/psgc-js
```

## Usage

Create your html markup.

```html
<!-- sample.html  -->
<body>
    <select id="regions"></select>
    <select id="provinces"></select>
    <select id="municipality"></select>
    <select id="barangay"></select>
</body>
```

Then initialize the object by passing the handler to init function.

```js
import PSGC from '@ageesea/psgc-js'

PSGC.init({
    bind: {
        region: "#regions",
        province: "#provinces",
        municipality: "#municipality",
        barangay: "#barangay",
    }
})
```

```js
// required options
{
    bind: {
        region: "id or class",
        province: "id or class",
        municipality: "id or class",
        barangay: "id or class",
    }
}
```

If you want to add a default value, then just add `data-default-value` attribute. For example,

```js
<select id="region" data-default-value="050000000"></select>
```

Then it will select the region matching the default value. You can also apply that to other fields such as province, municipality and barangay.

::: warning Note!
As of now, the default value will follow the hierarchy.

`region > province/district > municipality/city > barangay`
:::

However, if the default value is missing in between then it will not work like this one.

```html {2-3}
<select id="regions" data-default-value="050000000"></select><br />
<!-- The municipality and barangay will not work --> 
<!-- since there's no default value for province --> 
<select id="provinces"></select><br /> // [!code error]
<select id="municipality" data-default-value="056212000"></select><br />
<select id="barangay" data-default-value="056212034"></select>
```
