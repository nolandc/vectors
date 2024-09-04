
<script setup lang="ts">
// MLEquation.vue
import { defineProps } from 'vue';

defineProps({
  leftSide: { type: String, required: true },
  rightSide: { type: String, required: true },
});
</script>

<template>
  <mrow>
    <slot name="left">{{ leftSide }}</slot>
    <mo>=</mo>
    <slot name="right">{{ rightSide }}</slot>
  </mrow>
</template>