<template>
  <mrow>
    <mfrac>
      <mrow>
        <component :is="$slots.default?.()?.[0]"></component>
      </mrow>
      <mrow>
        <component :is="$slots.default?.()?.[1]"></component>
      </mrow>
    </mfrac>
  </mrow>
</template>