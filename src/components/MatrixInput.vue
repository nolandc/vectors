<template>
    <div>
      <h2>Edit Matrix</h2>
      <div class="matrix-container">
        <div class="matrix-notation">
          <div>| x1 y1 |</div>
          <div>| x2 y2 |</div>
        </div>
        <div class="matrix-inputs">
          <input v-model.number="matrix.x1" type="number" class="matrix-input" />
          <input v-model.number="matrix.y1" type="number" class="matrix-input" />
          <input v-model.number="matrix.x2" type="number" class="matrix-input" />
          <input v-model.number="matrix.y2" type="number" class="matrix-input" />
        </div>
      </div>
      <div>
        <h3>Matrix</h3>
        <pre>{{ matrix.toString() }}</pre>
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
    props.initialMatrix.x1,
    props.initialMatrix.y1,
    props.initialMatrix.x2,
    props.initialMatrix.y2
  ));
  
  // Watch for changes in matrix values and emit an update event
  watchEffect(() => {
    matrix.value.x1;
    matrix.value.y1;
    matrix.value.x2;
    matrix.value.y2;
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
  