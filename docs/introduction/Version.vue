<script setup>
import axios from "axios"
import { onMounted, reactive } from "vue"

const state = reactive({
    version: ''
})

onMounted(() => {
    axios.get("https://registry.npmjs.org/@ageesea/psgc-js/latest").then(({ data }) => {
        state.version = data.version
    })
})
</script>

<template>
    <b v-if="state.version">Version: {{ state.version }}</b>
</template>