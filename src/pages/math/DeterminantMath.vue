<script setup lang="ts">
import { computed } from 'vue';
import MLVectorVar from "../../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../../components/mathml/MLFormattedNumber.vue";
import Vector from '@/src/math/vector';
import Matrix2x2 from '@/src/math/matrix';
import MLHeader from '../../components/mathml/MLHeader.vue';

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
</script>

<template>
  <div class="determinant-math">
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mtable>
        <MLHeader label="theory"/>
        <mtr class="theory">
          <mtd>
            <mtext>det(M)</mtext>
            <mo>=</mo>
            <msub><mi>m</mi><mn>a</mn></msub>
            <msub><mi>m</mi><mn>d</mn></msub>
            <mo>-</mo>
            <msub><mi>m</mi><mn>b</mn></msub>
            <msub><mi>m</mi><mn>c</mn></msub>
          </mtd>
        </mtr>
        <MLHeader label="in practice"/>
        <mtr>
          <mtd>
            <mo>=</mo>
            (<MLFormattedNumber :val="m.a" :decimals="2" /> * <MLFormattedNumber :val="m.d" :decimals="2" />)
            <mo>-</mo>
            (<MLFormattedNumber :val="m.b" :decimals="2" /> * <MLFormattedNumber :val="m.c" :decimals="2" />)
          </mtd>
        </mtr>        
        <mtr>
          <mtd>
            <mo>=</mo>
            <MLFormattedNumber :val="scaleFactor" :decimals="2" />
          </mtd>
        </mtr>
        <MLHeader label="comparing areas"/>
        <mtr>
          <mtd>
            A1
            <mo>=</mo>
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
          <mtd>
            <mo>=</mo>
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
          <mtd>
            <mo>=</mo>
            <MLFormattedNumber :val="area" :decimals="2" />
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            A2
            <mo>=</mo>
            <mo>|</mo>
            <mrow>
              <MLVectorVar variable="Mv" />
              <mo>×</mo>
              <MLVectorVar variable="Mw" />
            </mrow>
            <mo>|</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mo>=</mo>
            <mo>|</mo>
            <mrow>
              <msub><mi>Mv</mi><mn>x</mn></msub>
              <msub><mi>Mw</mi><mn>y</mn></msub>
              <mo>-</mo>
              <msub><mi>Mv</mi><mn>y</mn></msub>
              <msub><mi>Mw</mi><mn>x</mn></msub>
            </mrow>
            <mo>|</mo>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mo>=</mo>
            <MLFormattedNumber :val="transformedArea" :decimals="2" />
          </mtd>
        </mtr>  
        <mtr>
          <mtd>
            <MLFormattedNumber :val="transformedArea" :decimals="2" />
            <mo>=</mo>
            <MLFormattedNumber :val="area" :decimals="2" />
            <mo>*</mo>
            <MLFormattedNumber :val="scaleFactor" :decimals="2" />
          </mtd>
        </mtr>            
      </mtable>
    </math>
  </div>
</template>