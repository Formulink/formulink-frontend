import { createRouter, createWebHistory } from 'vue-router'

import Onboarding from '@/pages/Onboarding.vue'
import Main from '@/pages/Main.vue'
import Subjects from '@/pages/divider-type/Subjects.vue'
import SubjectSections from '@/pages/divider-type/SubjectSections.vue'
import SectionsFormulas from '@/pages/formula/SectionsFormulas.vue'
import FormulaPage from '@/pages/formula/FormulaPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import FavoritesPage from '@/pages/profile/FavoritesPage.vue'
import RecentlyPage from '@/pages/profile/RecentlyPage.vue'

const routes = [
  {path: '/', component: Main},
  { path: '/onboarding', component: Onboarding },
  { path: '/subjects', component: Subjects},
  { path: '/subject/:id', component: SubjectSections },
  { path: '/subject/:id/:section_id', component: SectionsFormulas },
  { path: '/subject/:id/:section_id/:formula_id', component: FormulaPage },
  { path: '/formulas/:formula_id', component: FormulaPage },
  { path: '/search', component: SearchPage },
  { path: '/profile', component: ProfilePage},
  { path: '/favorites', component: FavoritesPage },
  { path: '/recently', component: RecentlyPage },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
