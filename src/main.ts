import { createApp } from 'vue'
import './style.css'
import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'

import Addition from './pages/AdditionPage.vue'
import Projection from './pages/ProjectionPage.vue'
import UnitCirclePage from './pages/UnitCirclePage.vue'
import LinearTransformationPage from './pages/LinearTransformationPage.vue'
import TestPage from './pages/TestPage.vue'
import DeterminantPage from './pages/DeterminantPage.vue'
import SVG from 'svg.js'
import SVGInteractivePoint from './SVGInteractivePoint'
import Vector from './math/vector'

const routes = [
  { path: "", component: Addition },
  { path: '/addition', component: Addition },
  { path: '/projection', component: Projection },
  { path: '/unit', component: UnitCirclePage },
  { path: '/transformation', component: LinearTransformationPage },
  { path: '/determinant', component: DeterminantPage},
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

// TODO: attempt to use extensions elsewhere, see if they're a decent approach
SVG.extend(SVG.Element, {
  attachToPoint: function(p: SVGInteractivePoint, f: (vec: Vector) => void) {
    p.onChange({
      update: (newVec) => f(newVec)
    })
    
    return this;
  }
})

SVG.extend(SVG.Element, {
  removeMouseInteraction: function() {
    (this as SVG.Element).style('pointer-events', 'none')
    return this
  }
})