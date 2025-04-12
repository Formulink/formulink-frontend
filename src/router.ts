import { createRouter, createWebHistory } from 'vue-router'

import Onboarding from '@/pages/Onboarding.vue'
import Main from '@/pages/Main.vue'
import Subjects from '@/pages/Subjects.vue'
import SubjectSections from '@/pages/SubjectSections.vue'
import SectionsFormulas from '@/pages/SectionsFormulas.vue'
import FormulaPage from '@/pages/FormulaPage.vue'

const routes = [
  {path: '/', component: Main},
  { path: '/onboarding', component: Onboarding },
  { path: '/subjects', component: Subjects},
  { path: '/subject/:id', component: SubjectSections },
  { path: '/subject/:id/:section_id', component: SectionsFormulas },
  { path: '/subject/:id/:section_id/:formula_id', component: FormulaPage },
  { path: '/formulas/:formula_id', component: FormulaPage },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
