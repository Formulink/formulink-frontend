<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Search from '@/components/special/search.vue'

import type { Formula } from '@/types/formula.ts'
import Icon_standalone from '../../public/icon_standalone.vue'

const allFormulas = ref<Formula[]>([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8082/formulas/all')
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
    allFormulas.value = await res.json()
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="min-h-screen p-8 flex flex-col gap-6 bg-gray-50">
    <icon_standalone class="size-12"/>
    <h1 class="appearing text-4xl font-sf-bold">Поиск</h1>
    <Search v-if="allFormulas.length" :formulas="allFormulas" class="appearing w-full" />
  </div>
</template>
