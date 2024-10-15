<script setup lang="ts">
import { provide } from 'vue'
import Vector from "../math/vector.ts";
import Colors from "../constants/Colors.ts";
import Matrix2x2 from "../math/matrix.ts";
import Visualization from "../components/layout/Visualization.vue";
import VizDetails from "../components/layout/VizDetails.vue";
import GridView from "../components/svg/GridView.vue";
import VectorView from "../components/svg/VectorView.vue";
import VectorInput from "../components/VectorInput.vue";
import DraggableCircleView from "../components/DraggableCircleView.vue";
import LabelView from "../components/svg/LabelView.vue";
import MatrixInput from "../components/MatrixInput.vue";
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import InlineColorLabel from '../components/InlineColorLabel.vue';
import MathDetails from '../components/layout/MathDetails.vue';
import MLVectorVar from '../components/mathml/MLVectorVar.vue';
import MLMatrix from '../components/mathml/MLMatrix.vue';
import MLVector from '../components/mathml/MLVector.vue';
import MLFormattedNumber from '../components/mathml/MLFormattedNumber.vue';
import MLHeader from '../components/mathml/MLHeader.vue';

const { v, m, vStateLink } = useUrlState({
  v: { type: 'vector', default: new Vector(-2, 2) },
  m: { type: 'matrix', default: new Matrix2x2(-1, 2, 2, 3) }
});

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)


const rotation = {
  v: new Vector(4.5, 4.5),
  m: new Matrix2x2(0, 1, -1, 0)
};

const shear = {
  v: new Vector(0, 4.5),
  m: new Matrix2x2(1, 2, 0, 1)
}
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="nv => v = nv"/>
        <MatrixInput :matrix="m" @updated="newM => m = newM"/>
        <VectorInput label="Mv" :color="Colors.green" :vector="v.multiplyByMatrix(m)" :editable="false"/>
      </div>
    </VizDetails>    
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.1">
      <VectorView :vector="v.multiplyByMatrix(m)" :color="Colors.green"/>
      <LabelView text="Mv" :position="v.multiplyByMatrix(m).divided(2)" :color="Colors.green"/>

      <VectorView :vector="v" :color="Colors.red"/>
      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>

      <DraggableCircleView :vector="v" @on-changed="nv => v = nv" :color="Colors.red"/>
    </GridView>
    <MathDetails>
      <template #notes>
        Linear transformations are operations that map vectors while preserving vector addition and scalar multiplication.

        <ul>
            <li>
                <InlineColorLabel label="Mv" :color="Colors.green"/> shows the result of applying 
                the linear transformation <InlineColorLabel label="M" :color="Colors.blue"/> to <InlineColorLabel label="v" :color="Colors.red"/>.
            </li>

            <li>
                The transformation preserves the origin (the point where both vectors start).
            </li>
            <li>
              Some useful, common matrix transformations are a 
              <a v-state-link="rotation">rotation</a> and a 
              <a v-state-link="shear">shear</a>
            </li>
        </ul>
      </template>
      <template #math>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <MLHeader label="theory"/>
            <mtr class="theory">
              <mtd>
                <mi>M</mi>
                <MLVectorVar variable="v" />                
                <mo>=</mo>
                <MLMatrix :matrix="[['a', 'b'], ['c', 'd']]" />
                <MLVector>
                  <mi>x</mi>
                  <mi>y</mi>
                </MLVector>

                <mo>=</mo>
                <MLVector>
                  <mrow>
                    <mi>a</mi><mi>x</mi><mo>+</mo><mi>b</mi><mi>y</mi>
                  </mrow>
                  <mrow>
                    <mi>c</mi><mi>x</mi><mo>+</mo><mi>d</mi><mi>y</mi>
                  </mrow>
                </MLVector>
              </mtd>
            </mtr>
            <MLHeader label="in practice"/>
            <mtr>
              <mtd>
                <mo>=</mo>
                <MLMatrix :matrix="[[m.a, m.b], [m.c, m.d]]" />
                <MLVector>
                  <MLFormattedNumber :val="v.x" :decimals="2" />
                  <MLFormattedNumber :val="v.y" :decimals="2" />
                </MLVector>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <MLVector>
                  <mrow>
                    <mo>(</mo>
                    <MLFormattedNumber :val="m.a" :decimals="2" />
                    <mo>×</mo>
                    <MLFormattedNumber :val="v.x" :decimals="2" />
                    <mo>)</mo>
                    <mo>+</mo>
                    <mo>(</mo>
                    <MLFormattedNumber :val="m.b" :decimals="2" />
                    <mo>×</mo>
                    <MLFormattedNumber :val="v.y" :decimals="2" />
                    <mo>)</mo>
                  </mrow>
                  <mrow>
                    <mo>(</mo>
                    <MLFormattedNumber :val="m.c" :decimals="2" />
                    <mo>×</mo>
                    <MLFormattedNumber :val="v.x" :decimals="2" />
                    <mo>)</mo>
                    <mo>+</mo>
                    <mo>(</mo>
                    <MLFormattedNumber :val="m.d" :decimals="2" />
                    <mo>×</mo>
                    <MLFormattedNumber :val="v.y" :decimals="2" />
                    <mo>)</mo>
                  </mrow>
                </MLVector>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <MLVector>
                  <MLFormattedNumber :val="m.a * v.x + m.b * v.y" :decimals="2"/>
                  <MLFormattedNumber :val="m.c * v.x + m.d * v.y" :decimals="2"/>
                </MLVector>
              </mtd>
            </mtr>
          </mtable>
        </math>
      </template>
    </MathDetails>
  </Visualization>
</template>