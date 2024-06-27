import { createApp } from 'vue'
import './style.css'
import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'

import Addition from './pages/AdditionPage.vue'
import Projection from './pages/ProjectionPage.vue'
import UnitCirclePage from './pages/UnitCirclePage.vue'
import LinearTransformationPage from './pages/LinearTransformationPage.vue'
import TestPage from './pages/TestPage.vue'

const routes = [
  { path: "", component: Addition },
  { path: '/addition', component: Addition },
  { path: '/projection', component: Projection },
  { path: '/unit', component: UnitCirclePage },
  { path: '/transformation', component: LinearTransformationPage },
  { path: '/test', component: TestPage }
]

const router = createRouter({
  linkActiveClass: 'active-router-link',
  history: createWebHistory(),
  routes,
})
    
createApp(App)
  .use(router)
  .mount('#app')

