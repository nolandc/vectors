<script setup lang="ts">
  import { Ref, onMounted, ref } from 'vue'
  import SVG from 'svg.js'
  import AdditionPage from "./pages/AdditionPage.vue"


  const context: Ref<SVG.Doc|undefined> = ref()
  function createVis() {
    context.value = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')
  }

  onMounted(() => {
    createVis()
  })


  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      createVis()
    })  
  }
</script>

<template>
  <div id="main">
    <div id="nav">
        <div class="link selected">
          <a href="#addition">addition</a>
        </div>
        <div class="link">
          <a href="#subtraction">subtraction</a>
        </div>
        <div class="link">
          <a href="#length">length</a>
        </div>                
    </div>
    <div id="chart">
      
    </div>
    <div v-if="context != undefined">
      <AdditionPage :context="context"/>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>

#nav {
  padding: 40px;
  background: #f2f2f2;

  .link {
    &.selected {
      a {
        text-decoration: underline;
      }
    }
    a {
      color: #333;
      &:hover {
        color:#666;
      }
    }
  }
}

#details {
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  #details-text {
    margin-top: auto;
  }
}
</style>
