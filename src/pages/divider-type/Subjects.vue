<script setup lang="ts">
import Icon_standalone from '/public/icon_standalone.vue'
import SubjectsCard from '@/components/cards/subjects-card.vue'
import { onMounted, ref } from 'vue'

import type { Subject } from '@/types/subject.ts'

const subjects = ref<Subject[]>([])

onMounted(async ()=>{
  const response = await fetch("http://localhost:8082/subjects")
  subjects.value = await response.json()

})
</script>



<template>
  <div class="appearing min-h-screen flex flex-col p-8 gap-6">
    

    <div v-if="subjects" class=" w-full flex flex-col gap-6">
      <h1 class="font-bold text-5xl">Предметы</h1>
      <SubjectsCard
        v-for="(item, index) in subjects"
        class="appearing"
        :key="index"
        :name = item.name
        :id = item.id
      />
    </div>
    <div class="h-40 bg-transparent"></div>
  </div>

</template>
