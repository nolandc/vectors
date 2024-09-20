<script setup lang="ts">
import { PropType, watch, reactive } from 'vue';
import Matrix2x2 from '../math/matrix';
import InputColorLabel from './InputColorLabel.vue';
import Colors from '../constants/Colors';

const props = defineProps({
  matrix: {
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

const localMatrix = reactive(new Matrix2x2(props.matrix.a, props.matrix.b, props.matrix.c, props.matrix.d));

watch(() => props.matrix, (newMatrix) => {
  localMatrix.a = newMatrix.a;
  localMatrix.b = newMatrix.b;
  localMatrix.c = newMatrix.c;
  localMatrix.d = newMatrix.d;
}, { deep: true });

watch(localMatrix, (newMatrix) => {
  emit('updated', new Matrix2x2(newMatrix.a, newMatrix.b, newMatrix.c, newMatrix.d));
}, { deep: true });
</script>

<template>
  <div>
    <div class="matrix-container">
      <div class="matrix-wrapper">
        <InputColorLabel :label="label" :color="color"/>
        <span> = </span>
        <div class="matrix-bracket left">[</div>
        <div class="matrix-inputs">
          <input v-model.number="localMatrix.a" inputmode="numeric" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
          <input v-model.number="localMatrix.b" inputmode="numeric" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
          <input v-model.number="localMatrix.c" inputmode="numeric" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
          <input v-model.number="localMatrix.d" inputmode="numeric" class="matrix-input" @focus="($event.target as HTMLInputElement)?.select()"/>
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