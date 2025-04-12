<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import Icon_standalone from '../../public/icon_standalone.vue'
import FDay from '@/components/main/FDay.vue'
import { onMounted, ref } from 'vue'
import type { Formula } from '@/types/formula.ts'
import type {Section} from '@/types/section.ts'
import CategoriesCard from '@/components/categories-card.vue'
import navigateTo from '@/funcs/navigate.ts'

const formula = ref<Formula | null>(null)
const sections = ref<Section[]>([])

const searchFocused = ref<boolean>(false)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8082/formulas/fday')
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
    const data = await res.json()
    formula.value = data
  } catch (err: never) {
    console.error(err)
  }

})

onMounted(async()=>{
  try{
    const res = await fetch("http://localhost:8082/sections")
    if (!res.ok) throw new Error(res.statusText)
    sections.value = await res.json()
  } catch (error) {
    console.error(error)
  }
})

</script>


<template>
  <div class="appearing min-h-screen flex flex-col p-8 gap-6 relative z-0"
      :class="searchFocused ? 'overflow-hidden' : ''"
  >
    <icon_standalone class="size-12"/>

    <div
      v-if="searchFocused"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
      @click="searchFocused = false"
    />

    <!--    search-->
    <div class="appearing relative z-50">
      <input
        @focus="searchFocused = true"
        @blur="searchFocused = false"
        class="z-10 transition-all duration-200 shadow-sm w-full font-regular focus:ring-0 focus:bg-gray-50 focus:outline-none border placeholder-gray-300 text-gray-400 border-gray-100 pl-10 px-2 py-3 "
        :class="searchFocused ? 'rounded-3xl' : 'rounded-xl'"
        placeholder="Поиск формул..."
      />
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
    </div>


    <!--    f of the day-->
    <div v-if="formula" class="appearing flex flex-col text-start gap-4 ">
      <h1 class="text-4xl font-sf-bold">Формула дня</h1>
      <FDay
        v-if="formula"
        :id="formula.id"
        :section-id="formula.sectionId"
        :name="formula.name"
        :description="formula.description"
        :email="formula.expression"
        :parameters="formula.parameters"
        :difficulty="formula.difficulty"
      />
    </div>


<!--   categories -->
    <div v-if="sections" class="appearing flex flex-col text-start gap-4">
      <h1 class="text-4xl font-sf-bold">Категории</h1>
      <div class="grid  lg:grid-cols-2 gap-4">
        <CategoriesCard  v-for="(item, index) in sections"
                         class="appearing"
                         :key="index"
                         :id="item.id"
                         :subject-id="item.subjectId"
                         :name="item.name"
                         :description="item.description"
        />
      </div>
      <button class="text-main-blue w-full text-center" @click="navigateTo('/subjects')">Все</button>
    </div>

    <div class="appearing flex flex-col text-start gap-4 ">
      <h1 class="text-4xl font-sf-bold">Недавно просмотрено</h1>
      <!--сюды айтем-->
    </div>

    <div class="pb-24">

    </div>
  </div>

  <div class="h-40 bg-transparent"></div>
</template>


<style>
.appearing{
  transform: translateY(20px);
  opacity: 0;
  animation: appear 0.2s ease-in forwards;
}

@keyframes appear {
  from{
    transform: translateY(20px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
}

.appearing:nth-child(1) {
  animation-delay: 0s;
}
.appearing:nth-child(2) {
  animation-delay: 0.1s;
}
.appearing:nth-child(3) {
  animation-delay: 0.2s;
}
.appearing:nth-child(4) {
  animation-delay: 0.3s;
}
.appearing:nth-child(5) {
  animation-delay: 0.4s;
}
.appearing:nth-child(6) {
  animation-delay: 0.5s;
}

.appearing:nth-child(7) {
  animation-delay: 0.6s;
}

.appearing:nth-child(8) {
  animation-delay: 0.7s;
}

.appearing:nth-child(9) {
  animation-delay: 0.8s;
}

.appearing:nth-child(10) {
  animation-delay: 0.9s;
}

</style>
