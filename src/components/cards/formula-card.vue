<script setup lang="ts">
import type { PropType } from 'vue'
import navigateTo from '@/funcs/navigate.ts'
import DifficultyStars from '@/components/special/difficulty-stars.vue'

const props = defineProps({
  id: String,
  sectionId: Number,
  name: String,
  description: String,
  expression: String,
  parameters: {
    type: Array as PropType<String>,
  },
  difficulty: Number,
  subjectId: String,
})
</script>
  <div class="w-full p-4 flex gap-4 cursor-pointer "
    @click="navigateTo(`/subject/${props.subjectId}/${props.sectionId}/${props.id}`)"
  >
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl">{{props.name}}</h1>
      <span class="tex-black/60 text-sm">{{props.description}}</span>
    </div>
    <div class="justify-end">
      <DifficultyStars :diff="props.difficulty"/>
    </div>

  </div>
<template>

</template>

<style scoped>

</style>
