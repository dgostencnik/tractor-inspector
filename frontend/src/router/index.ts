import { createRouter, createWebHistory } from 'vue-router'

import TractorView from '../views/tractor-view.vue'
import TractorsView from '../views/tractors-view.vue'

const routes = [
  { path: '/', name: 'TractorsIndex', component: TractorsView },
  { path: '/tractors/:id', name: 'TractorPage', component: TractorView },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
