<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  function createVis() {
    //context.value = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')
  }

  onMounted(() => {
    createVis()
  })


  const router = useRouter()
  router.beforeEach(() => {
    //context.value?.clear()
  })

  if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', () => {
      console.log('clearing via hot reload')
      //context.value?.clear()      
    })  
  }
</script>

<template>
  <div id="main">
    <div id="nav">
        <div class="link selected">
          <RouterLink to="./addition">addition</RouterLink>
        </div>
        <div class="link">
          <RouterLink to="./projection">projection</RouterLink>
        </div>                
        <div class="link">
          <RouterLink to="./unit">unit vec</RouterLink>
        </div>
        <div class="link">
          <RouterLink to="./dot">dot product</RouterLink>
        </div>         
        <div class="link">
          <RouterLink to="./transformation">linear transformation</RouterLink>
        </div>
        <div class="link">
          <RouterLink to="./eigen">eigenvectors</RouterLink>
        </div>        
          <div class="link">
          <RouterLink to="./determinant">determinant</RouterLink>
        </div>
    </div>

    <RouterView v-slot="{Component}">
      <component :is="Component"/>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>

#nav {
  padding: 40px;

  .link {
    &.missing {
      a {
        color: #aaa;
      }
    }
    a.active-router-link {
      text-decoration: underline;
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
