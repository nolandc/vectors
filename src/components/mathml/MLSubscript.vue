<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  base: { type: String, required: true },
  sub: { type: String, required: true },
});
</script>

<template>
  <msub>
    <mi>{{ base }}</mi>
    <mi>{{ sub }}</mi>
  </msub>
</template>