
<script setup lang="ts">
import { defineProps,  } from 'vue';

const props = defineProps({
  label: { type: String, required: true }
});

</script>

<template>
  <mtr class="label">
    <mtd class="label-data">
      <mtext>- {{props.label}} -</mtext>
    </mtd>
  </mtr>
</template>

<style lang="scss">
  mtr.label {
    text-align: center;
    mtd.label-data {
      padding: 20px 0;
    }
    mtext {
      border-bottom: 1px dotted #444;
      text-align: center;
    }
  }
</style>