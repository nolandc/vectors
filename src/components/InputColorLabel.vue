<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: false
    },
    color: {
        type: String,
        default: 'black'
    }
})
</script>

<template>
    <label class="vec-label">
        <span class="provided-label" :style="{ backgroundColor: color }">{{ label }}</span>
    </label>
</template>

<style scoped lang="scss">
.vec-label {
    vertical-align: middle;
    display: inline-block;
    width: 75px;
    text-align: right;
    font-size: 17px;

    .provided-label {
        border-radius: 4px;
        padding: 5px 6px;
        color: white;
        margin-right: 6px;
    }
}
</style>