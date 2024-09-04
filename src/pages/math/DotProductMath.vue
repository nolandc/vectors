<script setup lang="ts">
import { computed } from 'vue';
import MLAlignedEquations from "../../components/mathml/MLAlignedEquations.vue";
import MLVectorVar from "../../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../../components/mathml/MLFormattedNumber.vue";
import Vector from '@/src/math/vector';


interface Props {
  v: Vector;
  w: Vector;
}

const props = defineProps<Props>();

const dotProduct = computed(() => props.v.dotProduct(props.w));
const unitDotProduct = computed(() => props.v.unit().dotProduct(props.w.unit()));
const magnitudeProduct = computed(() => props.v.length() * props.w.length());
const cosTheta = computed(() => dotProduct.value / magnitudeProduct.value);
const angle = computed(() => Math.acos(Math.min(Math.max(cosTheta.value, -1), 1)));
const angleDegrees = computed(() => angle.value * 180 / Math.PI);
</script>

<template>
  <div class="dot-product-math">
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <MLVectorVar variable="v" />
            <mo>⋅</mo>
            <MLVectorVar variable="w" />
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <msub><mi>v</mi><mn>x</mn></msub>
            <msub><mi>w</mi><mn>x</mn></msub>
            <mo>+</mo>
            <msub><mi>v</mi><mn>y</mn></msub>
            <msub><mi>w</mi><mn>y</mn></msub>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
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
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="dotProduct" :decimals="2" />
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Dot product of unit vectors:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
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
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="unitDotProduct" :decimals="2" />
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Relationship with angle and magnitudes:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <MLVectorVar variable="v" />
            <mo>⋅</mo>
            <MLVectorVar variable="w" />
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mo>|</mo><MLVectorVar variable="v" /><mo>|</mo>
            <mo>|</mo><MLVectorVar variable="w" /><mo>|</mo>
            <mi>cos</mi>
            <mo>(</mo>
            <mi>θ</mi>
            <mo>)</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <MLFormattedNumber :val="dotProduct" :decimals="2" />
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mrow>
              <mo>(</mo>
              <MLFormattedNumber :val="v.length()" :decimals="2" />
              <mo>×</mo>
              <MLFormattedNumber :val="w.length()" :decimals="2" />
              <mo>)</mo>
            </mrow>
            <mo>×</mo>
            <mi>cos</mi>
            <mo>(</mo>
            <MLFormattedNumber :val="angle" :decimals="2" />
            <mo>)</mo>
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Angle between vectors:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mi>θ</mi>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <msup>
              <mi>cos</mi>
              <mrow>
                <mo>-</mo>
                <mn>1</mn>
              </mrow>
            </msup>
            <mrow>
              <mo>(</mo>
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
              <mo>)</mo>
            </mrow>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="angle" :decimals="2" />
            <mtext> radians</mtext>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="angleDegrees" :decimals="2" />
            <mi>°</mi>
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>
  </div>
</template>