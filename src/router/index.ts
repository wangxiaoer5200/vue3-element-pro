import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../config/route.config'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
