<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Play, PauseIcon, Maximize2, ChevronDown, ChevronUp, Info } from 'lucide-vue-next'
import type { Formula } from '@/types/formula.ts'
import Icon_standalone from '../../public/icon_standalone.vue'
import DifficultyStars from '@/components/special/difficulty-stars.vue'
import navigateTo from '@/funcs/navigate.ts'
import ReturnButton from '@/components/return-button.vue'

const route = useRoute()
const formula = ref<Formula | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showDetails = ref(false)
const videoPlaying = ref(false)

// For the graph
const showGraph = ref(false)
const canShowGraph = computed(() => {
  return formula.value?.expression &&
    !formula.value.expression.includes('=') &&
    formula.value.parameters?.length <= 1
})

const subjectId = route.params.id
const sectionId = route.params.section_id
const formulaId = route.params.formula_id

onMounted(async () => {
  try {
    console.log(formulaId)
    loading.value = true
    const resp = await fetch(`http://localhost:8082/formulas/${formulaId}`)
    if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`)
    formula.value = await resp.json()
    console.log("Formula loaded:", formula.value)
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = 'Failed to load formula data'
  } finally {
    loading.value = false
  }
})



</script>

<template>
  <div class="min-h-screen flex flex-col p-6 md:p-8 gap-6 bg-gray-50">
    <ReturnButton :url="`/subject/${subjectId}/${sectionId}`"/>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-[30%] h-12 w-12 border-2 border-gray-900"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl">
      {{ error }}
    </div>

    <!-- Formula content - FIXED: removed v-if and using v-else instead -->
    <div v-else class="appearing w-full flex flex-col gap-8">






      <!-- Video  -->
      <div class="appearing">
        <h1 class="text-3xl md:text-4xl font-bold">Видеоурок канала "Канал"</h1>
      <div class="relative aspect-video rounded-3xl overflow-hidden shadow-md">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/watch?v=o6Y9t-Mu9mA"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      </div>



    </div>
  </div>
</template>

