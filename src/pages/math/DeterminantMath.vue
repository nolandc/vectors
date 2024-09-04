<script setup lang="ts">
import { computed } from 'vue';
import MLAlignedEquations from "../../components/mathml/MLAlignedEquations.vue";
import MLVectorVar from "../../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../../components/mathml/MLFormattedNumber.vue";
import MLMatrix from "../../components/mathml/MLMatrix.vue";
import Vector from '@/src/math/vector';
import Matrix2x2 from '@/src/math/matrix';

interface Props {
  v: Vector;
  w: Vector;
  m: Matrix2x2;
}

const props = defineProps<Props>();

const area = computed(() => Math.abs(props.v.x * props.w.y - props.v.y * props.w.x));
const transformedArea = computed(() => {
  const mv = props.v.multiplyByMatrix(props.m);
  const mw = props.w.multiplyByMatrix(props.m);
  return Math.abs(mv.x * mw.y - mv.y * mw.x);
});
const scaleFactor = computed(() => props.m.determinant());
const areaRatio = computed(() => transformedArea.value / area.value);
</script>

<template>
  <div class="determinant-math">
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mtext>Area(A1)</mtext>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mo>|</mo>
            <mrow>
              <MLVectorVar variable="v" />
              <mo>×</mo>
              <MLVectorVar variable="w" />
            </mrow>
            <mo>|</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mo>|</mo>
            <mrow>
              <msub><mi>v</mi><mn>x</mn></msub>
              <msub><mi>w</mi><mn>y</mn></msub>
              <mo>-</mo>
              <msub><mi>v</mi><mn>y</mn></msub>
              <msub><mi>w</mi><mn>x</mn></msub>
            </mrow>
            <mo>|</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="area" :decimals="2" />
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Transformation by matrix M:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLMatrix :matrix="[[m.a, m.b], [m.c, m.d]]" />
    </math>

    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mtext>Area(A2)</mtext>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mo>|</mo>
            <mrow>
              <mi>M</mi>
              <MLVectorVar variable="v" />
              <mo>×</mo>
              <mi>M</mi>
              <MLVectorVar variable="w" />
            </mrow>
            <mo>|</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="transformedArea" :decimals="2" />
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Determinant of M (scale factor):</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mtext>det(M)</mtext>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <msub><mi>m</mi><mn>11</mn></msub>
            <msub><mi>m</mi><mn>22</mn></msub>
            <mo>-</mo>
            <msub><mi>m</mi><mn>12</mn></msub>
            <msub><mi>m</mi><mn>21</mn></msub>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="scaleFactor" :decimals="2" />
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>

    <p>Ratio of transformed area to original area:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <MLAlignedEquations>
        <mtr>
          <mtd>
            <mfrac>
              <mtext>Area(A2)</mtext>
              <mtext>Area(A1)</mtext>
            </mfrac>
          </mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <mo>|</mo>
            <mtext>det(M)</mtext>
            <mo>|</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd></mtd>
          <mtd>
            <mo>=</mo>
          </mtd>
          <mtd>
            <MLFormattedNumber :val="areaRatio" :decimals="2" />
          </mtd>
        </mtr>
      </MLAlignedEquations>
    </math>
  </div>
</template>