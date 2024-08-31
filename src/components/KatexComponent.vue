<template>
  <div class="katex-component" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import katex from 'katex';
import { useSlots } from 'vue';

const slots = useSlots();
const renderedContent = ref('');

// Function to render LaTeX from the slot content
const renderLatex = () => {
  // Extract content from the default slot
  const slotContent = slots.default?.()[0].children;
  if (typeof slotContent === 'string') {
    try {
      // Render LaTeX string to HTML using KaTeX
      renderedContent.value = katex.renderToString(slotContent, {
        throwOnError: false,
        output: 'mathml',
        displayMode: true,  // Display mode for block style rendering       
      });
    } catch (e) {
      console.error('Error rendering LaTeX content:', e);
      renderedContent.value = ''; // Set to empty if error occurs
    }
  }
};

// Watch the default slot content and re-render LaTeX if it changes
watchEffect(renderLatex);
</script>

<style >
.katex-component {
  margin-top: 20px;
  font-size: 18px;
  font-family: arial;
}
.katex-component math mover > mo {
}

/* Adjust the base of the vector if needed */
.katex-component math mover > mi {
  padding-top: 0.1em;
}

.katex-component mtd {
    text-align: left !important;
}
/* Styles specific to the LaTeX rendering container can be added here */
</style>
