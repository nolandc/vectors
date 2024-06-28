<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Use the Composition API's reactive features
const route = useRoute();

const mainComponent = computed(() => {
  // Extract the first part of the path and capitalize it
  const pathSegment = capitalize(route.path.split('/')[1]);
 return () => import(`./components/${pathSegment}Page.vue`);
});

const sidebarComponent = computed(() => {
  // Extract the first part of the path and capitalize it
  const pathSegment = capitalize(route.path.split('/')[1]);
  return () => import(`./components/${pathSegment}Details.vue`);
});
</script>


<template>
  <div>
    <header>App Header</header>
    <main>
      <!-- Render the dynamically determined main component -->
      <component :is="mainComponent"></component>
    </main>
    <aside>
      <!-- Render the dynamically determined sidebar component -->
      <component :is="sidebarComponent"></component>
    </aside>
  </div>
</template>

<style scoped>
/* Style definitions as needed */
header, main, aside {
  padding: 20px;
}
main {
  flex-grow: 1;
}
aside {
  width: 250px;
  flex-shrink: 0;
}
</style>