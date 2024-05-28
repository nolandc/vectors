
<script setup lang="ts">

import { PropType, onUpdated, ref } from 'vue';
import Vector from '../vector';

const props = defineProps({
    label: String,
    vector: {
        type: Object as PropType<Vector>,
        required: true
    }
})

const emit = defineEmits(['updated'])

const x = ref(props.vector.x.toString())
const y = ref(props.vector.y.toString())

onUpdated(() => {
    x.value = props.vector.x.toString()
    y.value = props.vector.x.toString()
})


let updateX = (value: string) => {
    let numValue = Number(value)
    x.value = value
    
    if (!Number.isNaN(numValue)) {
        emit('updated', new Vector(numValue, props.vector.y))
    }
}

let updateY = (value: string) => {
    let numValue = Number(value)
    y.value = value
    if (!Number.isNaN(numValue)) {
        emit('updated', new Vector(props.vector.x, numValue))
    }
}

</script>

<template>
    <div class="vector-input">
        <label class="vec-label">{{ props.label }} =</label>
        <span class="vector-notation">(</span>
        <input type="text" inputmode="numeric" :value="x" @input="event => updateX((event.target as HTMLInputElement).value)">
        <span class="vector-notation">,</span>
        <input type="text" inputmode="numeric" :value="y" @input="event => updateY((event.target as HTMLInputElement).value)">
        <span class="vector-notation">)</span>
    </div>
</template>


<style lang="scss">

.vector-input {
    display: block;
    margin-bottom: 10px;
    font-size: 24px;
    input {
        display: inline-block;
        width: 30px;
        font-size: 15px;
        padding: 4px;
        margin: 0 5px;
        border-radius: 3px;
        border: 1px solid gray;
    }
    .vec-label {
        margin-right: 10px;
    }
}



</style>
