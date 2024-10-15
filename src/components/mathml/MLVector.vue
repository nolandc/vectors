<template>
  <mrow class="ml-vector">
    <mo stretchy="true" class="bracket">[</mo>
    <mtable rowspacing="0.2em" columnalign="center">
      <mtr v-for="(child, index) in $slots.default?.()" :key="index">
        <mtd>
          <component :is="child"></component>
        </mtd>
      </mtr>
    </mtable>
    <mo class="bracket">]</mo>
  </mrow>
</template>

