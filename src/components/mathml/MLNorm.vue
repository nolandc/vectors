<template>
  <mrow>
    <mo stretchy="true">∥</mo>
    <component :is="$slots.default?.()?.[0]"></component>
    <mo stretchy="true">∥</mo>
  </mrow>
</template>
