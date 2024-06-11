
<script setup lang="ts">

import { PropType, ref, watch } from 'vue';
import Vector from '../vector';

const props = defineProps({
    label: String,
    color: {
        type: String,
        default: 'black',
    },
    editable: {
        type: Boolean,
        default: true
    },
    vector: {
        type: Object as PropType<Vector>,
        required: true,
    },
})

watch(() => props.vector, (newvec, _) => {
    x.value = newvec.x.toString()
    y.value = newvec.y.toString()
    console.log('vector has been updated, no?')
})


const emit = defineEmits(['updated'])

// We keep separate x/y values in this component because they may diverge briefly
// from the actual numbers of the vector. E.g. "3." is valid text input, but not
// a valid value for the vector
const x = ref(props.vector.x.toString())
const y = ref(props.vector.y.toString())

let updateX = (value: string) => {
    x.value = value
    
    if (!isNaN(Number(value)) && value.charAt(value.length-1) != ".") {
        let numValue = Number(value)
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
        <label class="vec-label">
            <span class="provided-label" style="background-color: {{props.color}};">{{ props.label }}</span>
            <span> =</span>
        </label>
        <span class="vector-notation parens">(</span>
        <span v-if="editable">
            <input 
                type="text" 
                inputmode="numeric" 
                :value="x" 
                @input="event => updateX((event.target as HTMLInputElement).value)"
                @focus="($event.target as HTMLInputElement)?.select()"
                >
            <span class="vector-notation">,</span>
            <input 
                type="text" 
                inputmode="numeric"
                :value="y" 
                @input="event => updateY((event.target as HTMLInputElement).value)"
                @focus="($event.target as HTMLInputElement)?.select()">
        </span>
        <span v-else>
            {{ x }}, {{  y }}
        </span>
        <span class="vector-notation parens">)</span>
    </div>
</template>


<style lang="scss">

.vector-input {
    display: block;
    margin-bottom: 10px;
    font-size: 24px;
    display: block;

    input {
        vertical-align: middle;
        display: inline-block;
        width: 36px;
        font-size: 15px;
        padding: 10px 4px;
        margin: 0 5px;
        border-radius: 3px;
        border: 1px solid gray;
        background: #f9f9f9;
        text-align: center;
        border: 1px solid #ccc;
    }
    .vec-label {
        margin-right: 10px;
        vertical-align: middle;
        display: inline-block;

        .provided-label {
            border-radius: 4px;
            padding: 5px 6px;
            color: white;
            background-color: v-bind('color');
            margin-right: 6px;
        }
    }
    .vector-notation {
        font-size: 30px;
        vertical-align: middle;

        &.parens {
            margin-top: -4px;
            display: inline-block;
        }
    }
}



</style>
