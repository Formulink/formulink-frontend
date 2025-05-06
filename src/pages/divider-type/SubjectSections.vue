<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Section } from '@/types/section.ts'
import Icon_standalone from '../../../public/icon_standalone.vue'
import SubjectsCard from '@/components/cards/subjects-card.vue'
import SectionCard from '@/components/cards/section-card.vue'
import NothingHere from '@/components/nothing-here.vue'
import ReturnButton from '@/components/buttons/return-button.vue'

const route = useRoute()
const sections = ref<Section[]>([])

onMounted(async () => {
  const id = route.params.id
  console.log(id)
  try {
    const resp = await fetch(`https://formulink.duckdns.org/${id}/sections`)
    if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`)
    console.log(resp)
    sections.value = await resp.json()
    console.log(sections.value)
  } catch (err) {
    console.error('Fetch error:', err)
  }
})

watch(sections, (newVal) => {
  console.log('Sections updated:', newVal)
})
</script>


<template>
  <div class="min-h-screen flex flex-col p-8 gap-6">

    <ReturnButton url="/subjects"/>

    <div v-if="sections" class="appearing w-full flex flex-col gap-6">
      <h1 class="font-bold text-5xl">Разделы</h1>
      <SectionCard
        class="appearing"
        v-for="(item, index) in sections"
        :key="index"
        :name = item.name
        :subject-id="item.subject_id"
        :description="item.description"
        :id = item.id
      />
    </div>
    <NothingHere class="w-full h-full" v-else/>
    <div class="h-40 bg-transparent"></div>
  </div>

</template>


