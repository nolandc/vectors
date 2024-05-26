
<script setup lang="ts">
    import { PropType, ref } from 'vue';
    import Vector from '../vector';

    const props = defineProps({
        label: String,
        vector: {
            type: Object as PropType<Vector>,
            required: true
        }
    })

    const vecString = ref(props.vector.x + ", " + props.vector.y)
</script>

<template>
    <label>{{ props.label }} </label>
    <input type="text" :value="vecString">
</template>
