
<script setup lang="ts">
import { PropType, ref, watchEffect } from 'vue';
import Matrix2x2 from '../math/matrix';
import InputColorLabel from './InputColorLabel.vue';
import Colors from '../constants/Colors';

const props = defineProps({
  initialMatrix: {
    type: Matrix2x2 as PropType<Matrix2x2>,
    required: true
  },
  label: {
    type: String,
    required: false,
    default: 'M'
  },
  color: {
    type: String,
    default: Colors.blue
  }
});

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


<template>
  <div>
    <div class="matrix-container">
      <div class="matrix-wrapper">
        <InputColorLabel :label="props.label" :color="props.color"/>
        <div class="matrix-bracket left">[</div>
        <div class="matrix-inputs">
          <input v-model.number="matrix.a" type="number" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
          <input v-model.number="matrix.b" type="number" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
          <input v-model.number="matrix.c" type="number" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
          <input v-model.number="matrix.d" type="number" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
        </div>
        <div class="matrix-bracket right">]</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.matrix-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
}

.matrix-wrapper {
  display: flex;
  align-items: center;
}

.matrix-bracket {
  font-size: 140px;
  font-weight: lighter;
  line-height: 140px;
  font-family: "Advent Pro";
}

.matrix-bracket.left {
  margin-right: -6px;
}

.matrix-bracket.right {
  margin-left: -6px;
}

.matrix-inputs {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
  margin-top: 3px;
}

.matrix-input {
  vertical-align: middle;
  display: inline-block;
  font-size: 15px;
  padding: 10px 4px;
  margin: 0 5px;
  border-radius: 3px;
  border: 1px solid gray;
  background: #f9f9f9;
  text-align: center;
  border: 1px solid #ccc;
  width: 60px;
}

.matrix-input::-webkit-outer-spin-button,
.matrix-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>