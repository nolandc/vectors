import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

import Addition from './pages/AdditionPage.vue'
import Projection from './pages/ProjectionPage.vue'
import UnitCirclePage from './pages/UnitCirclePage.vue'
import LinearTransformationPage from './pages/LinearTransformationPage.vue'
import DeterminantPage from './pages/DeterminantPage.vue'
import VueTestPage from './pages/AdditionPage.vue'
import EigenvectorPage from './pages/EigenvectorPage.vue'
import DotProductPage from './pages/DotProductPage.vue'

const routes = [
  { path: "", component: Addition },
  { path: '/addition', component: Addition },
  { path: '/projection', component: Projection },
  { path: '/unit', component: UnitCirclePage },
  { path: '/dot', component: DotProductPage },
  { path: '/transformation', component: LinearTransformationPage },
  { path: '/eigenvectors', component: EigenvectorPage },  
  { path: '/determinant', component: DeterminantPage},
  { path: '/vuetest', component: VueTestPage },
]

const router = createRouter({
  linkActiveClass: 'active-router-link',
  history: createWebHashHistory("/vectors/"),
  routes,
})
    
createApp(App)
  .use(router)
  .mount('#app')

