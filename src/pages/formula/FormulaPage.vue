<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Play, PauseIcon, Maximize2, ChevronDown, ChevronUp, Info } from 'lucide-vue-next'
import type { Formula } from '@/types/formula.ts'
import Icon_standalone from '../../../public/icon_standalone.vue'
import DifficultyStars from '@/components/special/difficulty-stars.vue'
import navigateTo from '@/funcs/navigate.ts'
import ReturnButton from '@/components/return-button.vue'
import 'katex/dist/katex.min.css'


const route = useRoute()
const formula = ref<Formula>()
const loading = ref(true)
const error = ref<string | null>(null)


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


    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-[30%] h-12 w-12 border-2 border-gray-900"></div>
    </div>


    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl">
      {{ error }}
    </div>





    <div v-else class="appearing w-full flex flex-col gap-8">
      <!-- formula header -->
      <div class="bg-white rounded-3xl shadow-sm p-6 md:p-8">
        <div class="flex items-center gap-4 mb-4">

          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">{{ formula?.name }}</h1>
        </div>

        <div v-if="formula.difficulty" class="flex flex-wrap items-center gap-4 mb-6">
          <span class="text-thin text-black/60">сложность </span>
          <DifficultyStars :diff="formula.difficulty" />
        </div>

        <p class="text-lg text-gray-700 mb-6">{{ formula?.description }}</p>

        <!-- formula -->
        <div class="bg-gray-50 rounded-2xl p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Формула</h2>
          <div class="bg-white border border-gray-200 rounded-xl p-4 text-2xl font-mono text-center">
            <vue-latex :size="3" :expression="formula.expression" display-mode />

          </div>
        </div>

        <!-- parameters -->
        <div>
            <span>Параметры</span>
          <div class="mt-6 bg-gray-50 rounded-2xl p-6 appearing">
            <div v-if="formula?.parameters && formula.parameters.length > 0">
              <div v-for="(param, index) in formula.parameters" :key="index" class="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                <span class="font-mono">{{ param }}</span>
              </div>
            </div>
            <div v-else class="text-gray-500 italic">
              Нет доступных параметров
            </div>
          </div>
        </div>
      </div>


      <!-- videp  -->
      <div class="appearing bg-white rounded-3xl shadow-sm p-6 md:p-8">
        <h2 class="text-2xl font-bold mb-4">Видеоурок</h2>
        <div class="relative aspect-video rounded-2xl overflow-hidden shadow-md">
          <iframe
            class="w-full h-full"
            src="https://www.youtube.com/embed/o6Y9t-Mu9mA"
            frameborder="0"
            allowfullscreen
          ></iframe>


        </div>
      </div>


      <div class="bg-white rounded-3xl shadow-sm p-6 md:p-8">
        <div class="flex items-center gap-2 mb-4">
          <Info class="w-5 h-5 " />
          <h2 class="text-xl font-bold">Задачи</h2>
        </div>

        <div>
          тут будут задачи
        </div>


      </div>

      <div class="h-40 bg-transparent"></div>
    </div>
  </div>
</template>

