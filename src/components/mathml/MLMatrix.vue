<script setup lang="ts">
import { computed } from 'vue';
import MLFormattedNumber from './MLFormattedNumber.vue';

interface Props {
  matrix: (string | number)[][];
}

const props = defineProps<Props>();

const rows = computed(() => {
  return props.matrix.map(row => 
    row.map(cell => 
      typeof cell === 'number' 
        ? { component: MLFormattedNumber, props: { val: cell, decimals: 2 } }
        : { component: 'mi', props: {}, children: cell }
    )
  );
});
</script>

<template>
  <mrow>
    <mo class="bracket">[</mo>
    <mtable rowspacing="4pt" columnspacing="1em">
      <mtr v-for="row in rows" :key="row.map(c => c.props.val || c.children).join(',')">
        <mtd v-for="cell in row" :key="cell.props.val || cell.children">
          <component :is="cell.component" v-bind="cell.props">
            {{ cell.children }}
          </component>
        </mtd>
      </mtr>
    </mtable>
    <mo class="bracket">]</mo>
  </mrow>
</template>

<style lang="scss">
.bracket {
  font-family: "Latin Modern Math";
}
</style>