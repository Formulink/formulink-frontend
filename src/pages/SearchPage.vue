<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Search from '@/components/special/search.vue'

import type { Formula } from '@/types/formula.ts'
import Icon_standalone from '../../public/icon_standalone.vue'

const allFormulas = ref<Formula[]>([])

onMounted(async () => {
  try {
    const res = await fetch('https://formulink.duckdns.org/formulas/all')
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
    allFormulas.value = await res.json()
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="min-h-screen p-8 flex flex-col gap-6 bg-gray-50">
    <h1 class="font-bold text-5xl">Поиск</h1>
    <Search v-if="allFormulas.length" :formulas="allFormulas" class="appearing w-full" />
  </div>
</template>
