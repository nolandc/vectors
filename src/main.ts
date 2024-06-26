import { createApp } from 'vue'
import './style.css'
import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'

import Addition from './pages/AdditionPage.vue'
import Projection from './pages/ProjectionPage.vue'
import UnitCirclePage from './pages/UnitCirclePage.vue'
import LinearTransformationPage from './pages/LinearTransformationPage.vue'

const routes = [
  { path: "", component: Addition },
  { path: '/addition', component: Addition },
  { path: '/projection', component: Projection },
  { path: '/unit', component: UnitCirclePage },
  { path: '/transformation', component: LinearTransformationPage }
]

const router = createRouter({
  linkActiveClass: 'active-router-link',
  history: createWebHistory(),
  routes,
})
    
createApp(App)
  .use(router)
  .mount('#app')

