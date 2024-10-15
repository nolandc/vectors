<script setup lang="ts">
import { computed } from 'vue';
import MLVector from "../../components/mathml/MLVector.vue";
import MLVectorVar from "../../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../../components/mathml/MLFormattedNumber.vue";
import MLMatrix from "../../components/mathml/MLMatrix.vue";
import Matrix2x2 from '@/src/math/matrix';
import Vector from '@/src/math/vector';
import MLHeader from '../../components/mathml/MLHeader.vue';

interface Props {
  matrix: Matrix2x2;
  vector: Vector;
  eigenvectors: Vector[];
}

const props = defineProps<Props>();

const eigenvalues = computed(() => props.matrix.eigenvalues());
</script>

<template>
  <div class="eigenvector-math">
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mtable>
        <MLHeader label="theory"/>
        <mtr>
          <mtd>
            <mi>M</mi>
            <MLVectorVar variable="v" />
            <mo>=</mo>
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
            <mo>=</mo>
            <MLVector>
              <mn>0</mn>
              <mn>0</mn>
            </MLVector>
          </mtd>
        </mtr>
        <mtr class="theory">
          <mtd>
            <mrow>
              <mo>det</mo>
              <mo class="bracket">(</mo>
              <mi>M</mi>
              <mo>-</mo>
              <mi>λ</mi>
              <mi>I</mi>
              <mo class="bracket">)</mo>
            </mrow>
            <mo>=</mo>
            <mn>0</mn>
          </mtd>
        </mtr>
        <MLHeader label="in practice"/>
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
            <mo>=</mo>
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
            <mo>=</mo>
            <mn>0</mn>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mi>λ</mi>
            <mo>=</mo>
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
          <mtd>
            <mo>=</mo>
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
        <mtr>
          <mtd>
            <mo>=</mo>
            <mrow>
              <MLFormattedNumber :val="eigenvalues[0]" :decimals="2" />
              <mo>,</mo>
              <MLFormattedNumber :val="eigenvalues[1]" :decimals="2" />
            </mrow>
          </mtd>
        </mtr>        
      </mtable>
    </math>
  </div>
</template>