<script setup>
import { onMounted, reactive } from 'vue';
import PSGC from '../../../src/index'


const props = defineProps(['geoCode', 'type'])
const state = reactive({
    provinces: [],
    cities: [],
})

onMounted(async () => {
    state.provinces = await PSGC.get("05", {
        geographic_level: "Prov"
    })
    state.cities = await PSGC.get("05", {
        geographic_level: "City"
    })
    console.log(state.provinces)
    console.log(state.cities)
})
</script>
<template>
    <div v-if="props.type === 'prov'">
        <h5>Example: Provinces of Region V</h5>
        <ul>
            <li v-for="item in state.provinces" :key="item.code">
                {{ item.name }}
                (Code: {{ item.correspondence_code }})
                (10-digit Code: {{ item.code }})
            </li>
        </ul>
    </div>
    <div v-else-if="props.type === 'city'">
        <h5>Example: Cities of Region V</h5>
        <ul>
            <li v-for="item in state.cities" :key="item.code">
                {{ item.name }}
                (Code: {{ item.correspondence_code }})
                (10-digit Code: {{ item.code }})
            </li>
        </ul>
    </div>
</template>