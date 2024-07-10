
<script setup lang="ts">

import { PropType, ref, watch } from 'vue';
import Vector from '../math/vector';
import MathUtils from '../math/utils';

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
        type: Vector as PropType<Vector>,
        required: true,
    },
})



const emit = defineEmits(['updated'])

// We keep separate x/y values in this component because they may diverge briefly
// from the actual numbers of the vector. E.g. "3." is valid text input, but not
// a valid value for the vector
const x = ref(props.vector.x.toString())
const y = ref(props.vector.y.toString())

watch(() => props.vector, (newvec, _) => {
    x.value = MathUtils.round(newvec.x, 4).toString()
    y.value = MathUtils.round(newvec.y, 4).toString()
})


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
                @focus="($event.target as HTMLInputElement)?.select()">
            <span class="vector-notation">,</span>
            <input 
                type="text" 
                inputmode="numeric"
                :value="y" 
                @input="event => updateY((event.target as HTMLInputElement).value)"
                @focus="($event.target as HTMLInputElement)?.select()">
        </span>
        <span v-else class="non-editable-vector">
            <span class="vector-value">
                {{ MathUtils.round(parseFloat(x), 3) }}
            </span>,
            <span class="vector-value">
                {{ MathUtils.round(parseFloat(y), 3) }}
            </span>            
        </span>
        <span class="vector-notation parens">)</span>
    </div>
</template>


<style lang="scss">

.vector-input {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    display: block;
    font-family: Courier;

    input {
        vertical-align: middle;
        display: inline-block;
        width: 60px;
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
        width: 100px;
        text-align: right;
        font-size: 17px;

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
    .non-editable-vector {
        .vector-value {
            display: inline-block;
            width: 80px;
        }
    }
}
</style>
