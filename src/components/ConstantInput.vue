<script setup lang="ts">
import { ref, watch } from 'vue';
import MathUtils from '../math/utils';
import InputColorLabel from './InputColorLabel.vue';

const props = defineProps({
    label: String,
    color: {
        type: String,
        default: 'black',
    },
    editable: {
        type: Boolean,
        default: false
    },
    value: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['updated'])

// We keep a separate input value because it may diverge briefly
// from the actual number. E.g. "3." is valid text input, but not
// a valid value for the constant
const inputValue = ref(props.value.toString())

watch(() => props.value, (newValue) => {
    inputValue.value = MathUtils.round(newValue, 4).toString()
})

const updateValue = (value: string) => {
    inputValue.value = value

    if (!isNaN(Number(value)) && value.charAt(value.length-1) != ".") {
        const numValue = Number(value)
        emit('updated', numValue)
    }
}
</script>

<template>
    <div class="constant-input">
        <InputColorLabel :label="props.label" :color="props.color" />
        <span> = </span>
        <span v-if="editable">
            <input 
                type="text" 
                inputmode="numeric" 
                :value="inputValue" 
                @input="event => updateValue((event.target as HTMLInputElement).value)"
                @focus="($event.target as HTMLInputElement)?.select()">
        </span>
        <span v-else class="non-editable-constant">
            <span class="constant-value">
                {{ MathUtils.round(parseFloat(inputValue), 3) }}
            </span>
        </span>
    </div>
</template>

<style lang="scss">
.constant-input {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    font-family: Courier;

    input {
        vertical-align: middle;
        display: inline-block;
        width: 60px;
        font-size: 15px;
        padding: 10px 4px;
        margin: 0 5px;
        border-radius: 3px;
        border: 1px solid #ccc;
        text-align: center;
    }
    .non-editable-constant {
        .constant-value {
            display: inline-block;
            width: 80px;
        }
    }
}
</style>