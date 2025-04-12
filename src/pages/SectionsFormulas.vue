<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Formula } from '@/types/formula.ts'
import Icon_standalone from '../../public/icon_standalone.vue'
import SubjectsCard from '@/components/cards/subjects-card.vue'
import SectionCard from '@/components/cards/section-card.vue'
import NothingHere from '@/components/nothing-here.vue'
import FormulaCard from '@/components/cards/formula-card.vue'

const route = useRoute()
const formulas = ref<Formula[]>([])

onMounted(async () => {
  const id = route.params.section_id
  console.log(id)
  try {
    const resp = await fetch(`http://localhost:8082/${id}/formulas`)
    if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`)
    formulas.value = await resp.json()
    console.log(formulas.value)
  } catch (err) {
    console.error('Fetch error:', err)
  }
})

watch(formulas, (newVal) => {
  console.log('formulas updated:', newVal)
})

</script>


<template>
  <div class="min-h-screen flex flex-col p-8 gap-6">
    <icon_standalone class="size-12"/>

    <div v-if="formulas" class="appearing w-full flex flex-col gap-6">
      <h1 class="font-bold text-5xl">Формулы</h1>
      <FormulaCard
        class="appearing"
        v-for="(item, index) in formulas"
        :key="index"
        :id="item.id"
        :section-id="item.sectionId"
        :name="item.name"
        :description="item.description"
        :expression="item.expression"
        :parameters="item.parameters"
        :difficulty="item.difficulty"
        :subject-id="route.params.id"
      />
    </div>
    <NothingHere class="w-full h-full" v-else/>
  </div>
  <div class="h-40 bg-transparent"></div>

</template>


