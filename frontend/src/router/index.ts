import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue'

const routes = [
  { path: '/', component: HomeView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
