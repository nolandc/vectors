<script setup lang="ts">
import { computed } from 'vue';
import MLAlignedEquations from "../../components/mathml/MLAlignedEquations.vue";
import MLVector from "../../components/mathml/MLVector.vue";
import MLVectorVar from "../../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../../components/mathml/MLFormattedNumber.vue";
import MLMatrix from "../../components/mathml/MLMatrix.vue";
import Matrix2x2 from '@/src/math/matrix';
import Vector from '@/src/math/vector';

interface Props {
  matrix: Matrix2x2;
  vector: Vector;
  eigenvectors: Vector[];
}

const props = defineProps<Props>();

const eigenvalues = computed(() => props.matrix.eigenvalues());

const dotProducts = computed(() => 
  props.eigenvectors.map(ev => ev.unit().dotProduct(props.vector.unit()))
);
</script>

<template>
  <div class="eigenvector-math">
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mi>M</mi>
            <MLVectorVar variable="v" />
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mi>λ</mi>
            <MLVectorVar variable="v" />
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mo>(</mo>
            <mi>M</mi>
            <mo>-</mo>
            <mi>λ</mi>
            <mi>I</mi>
            <mo>)</mo>
            <MLVectorVar variable="v" />
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLVector>
              <mn>0</mn>
              <mn>0</mn>
            </MLVector>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mrow>
              <mo>det</mo>
              <mo>(</mo>
              <mi>M</mi>
              <mo>-</mo>
              <mi>λ</mi>
              <mi>I</mi>
              <mo>)</mo>
            </mrow>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mn>0</mn>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mrow>
              <mo>det</mo>
              <mo>(</mo>
              <MLMatrix :matrix="[
                [`${matrix.a} - λ`, matrix.b],
                [matrix.c, `${matrix.d} - λ`]
              ]" />
              <mo>)</mo>
            </mrow>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mn>0</mn>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <msup>
              <mi>λ</mi>
              <mn>2</mn>
            </msup>
            <mo>-</mo>
            <mrow>
              <mo>(</mo>
              <MLFormattedNumber :val="matrix.a + matrix.d" :decimals="2" />
              <mo>)</mo>
            </mrow>
            <mi>λ</mi>
            <mo>+</mo>
            <mrow>
              <mo>(</mo>
              <MLFormattedNumber :val="matrix.a * matrix.d - matrix.b * matrix.c" :decimals="2" />
              <mo>)</mo>
            </mrow>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mn>0</mn>
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Using the quadratic formula: </p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mi>λ</mi>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mfrac>
              <mrow>
                <mo>-</mo>
                <mi>b</mi>
                <mo>±</mo>
                <msqrt>
                  <msup>
                    <mi>b</mi>
                    <mn>2</mn>
                  </msup>
                  <mo>-</mo>
                  <mn>4</mn>
                  <mi>a</mi>
                  <mi>c</mi>
                </msqrt>
              </mrow>
              <mrow>
                <mn>2</mn>
                <mi>a</mi>
              </mrow>
            </mfrac>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mfrac>
              <mrow>
                <MLFormattedNumber :val="matrix.a + matrix.d" :decimals="2" />
                <mo>±</mo>
                <msqrt>
                  <msup>
                    <mrow>
                      <mo>(</mo>
                      <MLFormattedNumber :val="matrix.a + matrix.d" :decimals="2" />
                      <mo>)</mo>
                    </mrow>
                    <mn>2</mn>
                  </msup>
                  <mo>-</mo>
                  <mn>4</mn>
                  <mo>(</mo>
                  <MLFormattedNumber :val="matrix.a * matrix.d - matrix.b * matrix.c" :decimals="2" />
                  <mo>)</mo>
                </msqrt>
              </mrow>
              <mn>2</mn>
            </mfrac>
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Eigenvalues:</p>
    <MLVector>
      <MLFormattedNumber :val="eigenvalues[0]" :decimals="2" />
      <MLFormattedNumber :val="eigenvalues[1]" :decimals="2" />
    </MLVector>

    <p>Dot products of v with eigenvectors:</p>
    <MLVector>
      <MLFormattedNumber :val="dotProducts[0]" :decimals="2" />
      <MLFormattedNumber :val="dotProducts[1]" :decimals="2" />
    </MLVector>
  </div>
</template>