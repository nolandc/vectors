<script setup lang="ts">
import { computed } from 'vue';
import MLVectorVar from "../../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../../components/mathml/MLFormattedNumber.vue";
import Vector from '@/src/math/vector';
import MLHeader from '../../components/mathml/MLHeader.vue';


interface Props {
  v: Vector;
  w: Vector;
}

const props = defineProps<Props>();

const dotProduct = computed(() => props.v.dotProduct(props.w));
const unitDotProduct = computed(() => props.v.unit().dotProduct(props.w.unit()));
</script>

<template>
  <div class="dot-product-math">
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mtable>
        <MLHeader label="theory"/>
        <mtr class="theory">
          <mtd>
            <MLVectorVar variable="v" />
            <mo>⋅</mo>
            <MLVectorVar variable="w" />
            <mo>=</mo>
            <msub><mi>v</mi><mn>x</mn></msub>
            <msub><mi>w</mi><mn>x</mn></msub>
            <mo>+</mo>
            <msub><mi>v</mi><mn>y</mn></msub>
            <msub><mi>w</mi><mn>y</mn></msub>
          </mtd>
        </mtr>
        <MLHeader label="in practice"/>
        <mtr>
          <mtd>
            <mo>=</mo>
            <mrow>
              <mo>(</mo>
              <MLFormattedNumber :val="v.x" :decimals="2" />
              <mo>×</mo>
              <MLFormattedNumber :val="w.x" :decimals="2" />
              <mo>)</mo>
            </mrow>
            <mo>+</mo>
            <mrow>
              <mo>(</mo>
              <MLFormattedNumber :val="v.y" :decimals="2" />
              <mo>×</mo>
              <MLFormattedNumber :val="w.y" :decimals="2" />
              <mo>)</mo>
            </mrow>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mo>=</mo>
            <MLFormattedNumber :val="dotProduct" :decimals="2" />
          </mtd>
        </mtr>
        <MLHeader label="dot product of unit vectors"/>
        <mtr>
          <mtd>
            <mfrac>
              <mrow>
                <MLVectorVar variable="v" />
                <mo>⋅</mo>
                <MLVectorVar variable="w" />
              </mrow>
              <mrow>
                <mo>|</mo><MLVectorVar variable="v" /><mo>|</mo>
                <mo>|</mo><MLVectorVar variable="w" /><mo>|</mo>
              </mrow>
            </mfrac>
            <mo>=</mo>
            <MLFormattedNumber :val="unitDotProduct" :decimals="4" />
          </mtd>
        </mtr>
      </mtable>
    </math>
  </div>
</template>