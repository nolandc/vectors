
<script setup lang="ts">
    import { PropType, computed } from 'vue';
    import Vector from '../vector';

    const props = defineProps({
        label: String,
        vector: {
            type: Object as PropType<Vector>,
            required: true
        }
    })
    const vecString = computed(() => props.vector.x + ", " + props.vector.y)
</script>

<template>
    <div class="container">
        <label class="vec-label">{{ props.label }} </label>
        <input type="text" :value="vecString">
    </div>
</template>


<style>
.container {
    display: block;
}
.vec-label {
    margin-right: 10px;
}
</style>
