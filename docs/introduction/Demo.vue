<script setup>
import PSGC from "../../src/index.js";
import { onMounted } from "vue"

onMounted(() => {
    PSGC.init({
        bind: {
            region: "#regions",
            province: "#provinces",
            municipality: "#municipality",
            barangay: "#barangay",
        }
    })
})
</script>
<template>
    <div :class="$style['mb-3']">
        <select :class="$style['demo-select']" id="regions"></select>
        <select :class="$style['demo-select']" id="provinces"></select>
        <select :class="$style['demo-select']" id="municipality"></select>
        <select :class="$style['demo-select']" id="barangay"></select>
    </div>
</template>

<style module>
.demo-select {
    background-color: rgb(246, 246, 246);
    border: 1px solid rgb(145, 145, 145);
    padding: 5px 15px;
    margin-right: 10px;
    width: 20%;
}

.mb-3 {
    margin-bottom: 1.5em;
}
</style>