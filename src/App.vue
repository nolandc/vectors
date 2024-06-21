<script setup lang="ts">
  import { Ref, onMounted, ref } from 'vue'
  import SVG from 'svg.js'
  import AdditionPage from "./pages/AdditionPage.vue"
  import { useRouter } from 'vue-router'

  let selectedPage: string = 'addition'
  const isActivePage = (page: string) => page == selectedPage

  const context: Ref<SVG.Doc|undefined> = ref()
  function createVis() {
    context.value = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')
  }

  onMounted(() => {
    createVis()
  })


  const router = useRouter()
  router.beforeEach(() => {
    context.value?.clear()
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
          <RouterLink to="/addition">addition</RouterLink>
        </div>
        <div class="link">
          <RouterLink to="/projection">projection</RouterLink>
        </div>                
        <div class="link missing">
          <RouterLink to="/unit">unit vector</RouterLink>
        </div> 
        <div class="link missing">
          <RouterLink to="/addition">length</RouterLink>
        </div>                
    </div>
    <div id="chart">
      
    </div>
    <div v-if="context != undefined">
      <div id="details" d>
        <RouterView v-slot="{Component}">
          <component :is="Component"
          :context="context"/>
        </RouterView>
      </div>    
    </div>
  </div>
</template>

<style lang="scss" scoped>

#nav {
  padding: 40px;
  background: #f2f2f2;

  .link {
    &.missing {
      a {
        color: #aaa;
      }
    }    
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
