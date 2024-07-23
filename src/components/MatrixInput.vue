<template>
    <div>
      <h2>Edit Matrix</h2>
      <div class="matrix-container">
        <div class="matrix-notation">
          <div>| a b |</div>
          <div>| c d |</div>
        </div>
        <div class="matrix-inputs">
          <input v-model.number="matrix.a" type="number" class="matrix-input" />
          <input v-model.number="matrix.b" type="number" class="matrix-input" />
          <input v-model.number="matrix.c" type="number" class="matrix-input" />
          <input v-model.number="matrix.d" type="number" class="matrix-input" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import Matrix2x2 from '../math/matrix';
  
  const props = defineProps<{
    initialMatrix: Matrix2x2
  }>();
  
  const emit = defineEmits(['updated']);
  
  const matrix = ref(new Matrix2x2(
    props.initialMatrix.a,
    props.initialMatrix.b,
    props.initialMatrix.c,
    props.initialMatrix.d
  ));
  
  // Watch for changes in matrix values and emit an update event
  watchEffect(() => {
    matrix.value.a;
    matrix.value.b;
    matrix.value.c;
    matrix.value.d;
    emit('updated', matrix.value);
  });
  </script>
  
  <style scoped>
  .matrix-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .matrix-notation {
    font-family: monospace;
    margin-right: 20px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-items: end;
  }
  
  .matrix-inputs {
    display: grid;
    grid-template-columns: repeat(2, 100px);
    gap: 10px;
  }
  
  .matrix-input {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    -moz-appearance: textfield;
    -webkit-appearance: none;
  }
  
  .matrix-input::-webkit-outer-spin-button,
  .matrix-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  </style>
  