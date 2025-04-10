import { createRouter, createWebHistory } from 'vue-router'

import Onboarding from '@/pages/Onboarding.vue'
import Main from '@/pages/Main.vue'
import Subjects from '@/pages/Subjects.vue'

const routes = [
  {path: '/', component: Main},
  { path: '/onboarding', component: Onboarding },
  { path: '/subjects', component: Subjects}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
