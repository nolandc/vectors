import { createApp } from 'vue'
import './style.css'
import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'

import Addition from './pages/AdditionPage.vue'
import Projection from './pages/ProjectionPage.vue'
import UnitCirclePage from './pages/UnitCirclePage.vue'

const routes = [
  { path: "", component: Addition },
  { path: '/addition', component: Addition },
  { path: '/projection', component: Projection },
  { path: '/unit', component: UnitCirclePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
    
createApp(App)
  .use(router)
  .mount('#app')

