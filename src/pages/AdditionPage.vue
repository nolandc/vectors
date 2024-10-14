<script setup lang="ts">
import { provide } from "vue";
import GridView from "../components/svg/GridView.vue"
import Vector from "../math/vector";
import VectorView from "../components/svg/VectorView.vue";
import DraggableCircleView from "../components/DraggableCircleView.vue"
import VectorInput from "../components/VectorInput.vue";
import LineView from "../components/svg/LineView.vue";
import Colors from "../constants/Colors";
import LabelView from "../components/svg/LabelView.vue"
import Visualization from "../components/layout/Visualization.vue";
import VizDetails from "../components/layout/VizDetails.vue"
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from '../components/layout/MathDetails.vue'
import InlineColorLabel from "../components/InlineColorLabel.vue";
import MLVector from "../components/mathml/MLVector.vue";
import MLVectorVar from "../components/mathml/MLVectorVar.vue";
import MLSubscript from "../components/mathml/MLSubscript.vue";
import MLFormattedNumber from "../components/mathml/MLFormattedNumber.vue";
import MLHeader from "../components/mathml/MLHeader.vue";

// Use the composable to manage URL state
const { v, w } = useUrlState({
  v: { type: 'vector', default: new Vector(-2, 5) },
  w: { type: 'vector', default: new Vector(5, 3) }
});

</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" color="#f94144" :vector="v" @updated="nv => v = nv"/>
        <VectorInput label="w" color="#43aa8b" :vector="w" @updated="v => w = v"/>
        <VectorInput label="v+w" color="#577590" :vector="v.plus(w)" :editable="false"/>
      </div>
    </VizDetails>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="v.plus(w)" :origin="v" :color="Colors.lightGray" strokeDashArray="10"/>
      <DraggableCircleView :vector="v" @onChanged="nv => v = nv" :color="Colors.red"/>
      <VectorView :vector="v" :color="Colors.red"/>
      <DraggableCircleView :vector="w" @onChanged="v => w = v" :color="Colors.green"/>
      <VectorView :vector="w" :color="Colors.green"/>
      <VectorView :vector="w.plus(v)" :color="Colors.blue"/>
      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>
      <LabelView text="w" :position="w.divided(2)" :color="Colors.green"/>
      <LabelView text="v+w" :position="v.plus(w).divided(2)" :color="Colors.blue"/>
    </GridView>
    <MathDetails>
      <template #notes>
        Vector addition combines two or more vectors by adding their corresponding components.
        <ul>
          <li>
            Visually, you can imagine simply placing the origin of the first vector at the tip of the second.	        
          </li>
          <li>
            Notice how dotted gray vector extending from the tip of <InlineColorLabel label="v" :color="Colors.red"/>
            to <InlineColorLabel label="v+w" :color="Colors.blue"/> is the same magnitude as 
            <InlineColorLabel label="w" :color="Colors.green"/>. 
          </li>
        </ul>
      </template>
      <template #math>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block" >
          <mtable columnalign="center">
            <MLHeader label="theory"/>
            <mtr class="theory">
              <mtd>
                <mrow>
                  <MLVectorVar variable="v" />
                  <mo>+</mo>
                  <MLVectorVar variable="w" />
                  <mo>=</mo>
                </mrow>
                <MLVector>
                  <MLSubscript base="v" sub="x" />
                  <MLSubscript base="v" sub="y" />
                </MLVector>
                <mo>+</mo>
                <MLVector>
                  <MLSubscript base="w" sub="x" />
                  <MLSubscript base="w" sub="y" />
                </MLVector>
                <mo>=</mo>
                <MLVector>
                  <mrow>
                    <MLSubscript base="v" sub="x" />
                    <mo>+</mo>
                    <MLSubscript base="w" sub="x" />
                  </mrow>
                  <mrow>
                    <MLSubscript base="v" sub="y" />
                    <mo>+</mo>
                    <MLSubscript base="w" sub="y" />
                  </mrow>
                </MLVector>
              </mtd>
            </mtr>
            <MLHeader label="in practice"/>
            <mtr>
              <mtd>
                <mo>=</mo>
                <MLVector>
                  <MLFormattedNumber :val="v.x" :decimals="2" />
                  <MLFormattedNumber :val="v.y" :decimals="2" />
                </MLVector>
                <mo>+</mo>
                <MLVector>
                  <MLFormattedNumber :val="w.x" :decimals="2" />
                  <MLFormattedNumber :val="w.y" :decimals="2" />
                </MLVector>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <MLVector>
                  <MLFormattedNumber :val="v.x + w.x" :decimals="2" />
                  <MLFormattedNumber :val="v.y + w.y" :decimals="2" />
                </MLVector>
              </mtd>
            </mtr>
          </mtable>
        </math>
      </template>
    </MathDetails>
  </Visualization>
</template>