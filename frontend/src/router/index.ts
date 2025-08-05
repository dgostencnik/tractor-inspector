import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/About.vue'
import HomeView from '../views/Home.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
