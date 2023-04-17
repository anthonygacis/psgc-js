import PSGC from './src/index'

PSGC.init({
    bind: {
        region: "#regions",
        province: "#provinces",
        municipality: "#municipality",
        barangay: "#barangay",
    }
})

console.log(await PSGC.get("05", {
    geographic_level: "Prov"
}))