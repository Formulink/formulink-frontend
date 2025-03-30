import { createRouter, createWebHistory } from 'vue-router'

import Onboarding from '@/pages/Onboarding.vue'
import Main from '@/pages/Main.vue'

const routes = [
  {path: '/', component: Main},
  { path: '/onboarding', component: Onboarding },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
