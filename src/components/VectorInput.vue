
<script setup lang="ts">

import { PropType, onUpdated, ref, watch } from 'vue';
import Vector from '../vector';

const props = defineProps({
    label: String,
    vector: {
        type: Object as PropType<Vector>,
        required: true,
    }
})

watch(() => props.vector, (newvec, _) => {
    
    x.value = newvec.x.toString()
    y.value = newvec.y.toString()
})


const emit = defineEmits(['updated'])

const x = ref(props.vector.x.toString())
const y = ref(props.vector.y.toString())


let updateX = (value: string) => {
    x.value = value
    
    console.log('value', value)
    if (!isNaN(Number(value)) && value.charAt(value.length-1) != ".") {
        let numValue = Number(value)
        console.log('emitting update...')
        emit('updated', new Vector(numValue, props.vector.y))
    }
}

let updateY = (value: string) => {
    y.value = value

    if (!isNaN(Number(value)) && value.charAt(value.length-1) != ".") {
        let numValue = Number(value)
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
