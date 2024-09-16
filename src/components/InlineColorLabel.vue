<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'black'
    }
})
</script>

<template>
    <span class="provided-label" :style="{ backgroundColor: color }">{{ label }}</span>
</template>

<style scoped lang="scss">
    .provided-label {
        font-family: Courier, monospace;
        vertical-align: middle;
        display: inline;
        text-align: right;
        font-size: 17px;
        border-radius: 4px;
        padding: 0px 4px 2px 4px;
        color: white;
    }
</style>