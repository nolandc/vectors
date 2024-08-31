<template>
  <mrow>
    <mo>[</mo>
    <mtable rowspacing="0.2em" columnalign="center">
      <mtr v-for="(child, index) in $slots.default?.()" :key="index">
        <mtd>
          <component :is="child"></component>
        </mtd>
      </mtr>
    </mtable>
    <mo>]</mo>
  </mrow>
</template>
