<script setup lang="ts">

import Icon_standalone from '../../public/icon_standalone.vue'
import FDay from '@/components/main/FDay.vue'
import { onMounted, ref } from 'vue'
import type { Formula } from '@/types/formula.ts'
import type {Section} from '@/types/section.ts'
import CategoriesCard from '@/components/cards/categories-card.vue'
import navigateTo from '@/funcs/navigate.ts'
import { watch } from 'vue'

const formula = ref<Formula | null>(null)
const sections = ref<Section[]>([])





onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8082/formulas/fday')
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
    formula.value  = await res.json()
  } catch (err: never) {
    console.error(err)
  }

})

onMounted(async()=>{
  try{
    const res = await fetch("http://localhost:8082/sections")
    if (!res.ok) throw new Error(res.statusText)
    sections.value = await res.json()
    secitons.value = shuffle(sections.value.slice(0, 6))
  } catch (error) {
    console.error(error)
  }
})



function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array
}





</script>


<template>

  <div class="appearing h-dvh flex flex-col p-8 gap-6 relative z-0"
  >
    <icon_standalone class="size-12"/>


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
                         :subject-id="item.subject_id"
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

  </div>

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
