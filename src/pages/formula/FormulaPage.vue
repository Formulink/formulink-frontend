<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Info, Heart } from 'lucide-vue-next'
import type { Formula } from '@/types/formula.ts'
import DifficultyStars from '@/components/special/difficulty-stars.vue'
import ReturnButton from '@/components/buttons/return-button.vue'
import 'katex/dist/katex.min.css'
import type { Task } from '@/types/task.ts'
import TaskCard from '@/components/cards/task-card.vue'


const route = useRoute()
const formula = ref<Formula>()
const loading = ref(true)
const error = ref<string | null>(null)
const tasks = ref<Task[]>([])

const isFavorite = ref<boolean>(false)

const subjectId = route.params.id
const sectionId = route.params.section_id
const formulaId = route.params.formula_id


onMounted(async () => {
  try {

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

onMounted(async ()=>{
  try{
    const resp = await fetch(`http://localhost:8082/tasks/${formulaId}`)
    tasks.value = await resp.json()
    console.log("tasks: ", resp)
  } catch(err){
    console.error(err)
  }
})

onMounted(async ()=>{
  try{
    const resp = await fetch("http://localhost:8082/like-status", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id'),
        formula_id: formulaId
      })
    })
    console.log(resp)
    isFavorite.value = resp.status == 200
  } catch (e){
    console.error(e)
  }
})

const handleLike = async () =>{
  try{
    await fetch(`http://localhost:8082/like`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id'),
        formula_id: formulaId
      })
    })
  } catch (e){
    console.error(e)
  } finally {
    isFavorite.value = !isFavorite.value
  }
}


</script>

<template>
  <div class="min-h-dvh flex flex-col p-6 md:p-8 gap-6 bg-gray-50">
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
        <div class="flex items-center justify-between gap-4 mb-4">

          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">{{ formula?.name }}</h1>
          <Heart
            @click="handleLike"
            :class="isFavorite ? 'fill-main-blue text-main-blue' : 'text-main-blue fill-amber-50'"
          />
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


      <div v-if="tasks?.length > 0" class="mb-20 bg-white rounded-3xl shadow-sm p-6 md:p-8">
        <div class="flex items-center gap-2 mb-4">
          <Info class="w-5 h-5 " />
          <h2 class="text-xl font-bold">Задачи</h2>
        </div>

        <div class="flex flex-col gap-2">
          <TaskCard
            v-for="(item, index) in tasks"
            :key="index"
            :number="index + 1"
            :id="item.id"
            :formula-id="item.formula_id"
            :difficulty="item.difficulty"
            :task_text="item.text"
            :result="item.result"

          />
        </div>

      </div>
    </div>
  </div>
</template>

