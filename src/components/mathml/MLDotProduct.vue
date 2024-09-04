<template>
  <mrow>
    <component :is="$slots.default?.()?.[0]"></component>
    <mo>⋅</mo>
    <component :is="$slots.default?.()?.[1]"></component>
  </mrow>
</template>