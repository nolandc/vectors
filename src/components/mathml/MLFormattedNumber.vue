<script setup lang="ts">
import { defineProps, computed } from 'vue';
import MathUtils from '../../math/utils';

const props = defineProps({
  val: { type: Number, required: true },
  decimals: { type: Number, default: 3 },
});

const formattedValue = computed(() => MathUtils.formatWithPadding(props.val, props.decimals));
//const totalChars = computed(() => (7 - (3 - props.decimals)).toString() + 'ch' )
</script>

<template>
  <mn>{{ formattedValue }}</mn>
</template>

<style lang="scss" scoped>
mn {
  font-family: "JetBrains Mono";
  display: inline-block;
  text-align: center;
  font-size: 14px;
  //min-width: v-bind('totalChars');
  white-space: pre;
}
</style>