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
        displayMode: true  // Display mode for block style rendering
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

<style scoped>
.katex-component {
  margin-top: 20px;
  font-size: 20px;
}
/* Styles specific to the LaTeX rendering container can be added here */
</style>
