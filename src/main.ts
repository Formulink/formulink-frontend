import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router.ts'
import { VueLatex } from 'vatex'

createApp(App).use(router).use(VueLatex).mount('#app');

