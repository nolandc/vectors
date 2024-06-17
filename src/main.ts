import { createApp } from 'vue'
import './style.css'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from './App.vue'

import Addition from './pages/AdditionPage.vue'
import Projection from './pages/ProjectionPage.vue'

const routes = [
  {path: "", component: Addition},
  { path: '/addition', component: Addition },
  { path: '/projection', component: Projection },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
    
createApp(App).use(router).mount('#app')

