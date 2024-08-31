<script setup lang="ts">
// MLVectorVar.vue
import { defineProps, computed } from 'vue';

const props = defineProps({
  variable: { type: String, required: true },
  isUnit: { type: Boolean, default: false },
});

const vectorSymbol = computed(() => props.isUnit ? '^' : '→');
</script>

<template>
  <mover>
    <mi>{{ variable }}</mi>
    <mo>{{ vectorSymbol }}</mo>
  </mover>
</template>