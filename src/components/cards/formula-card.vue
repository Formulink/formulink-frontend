<script setup lang="ts">
import type { PropType } from 'vue'
import navigateTo from '@/funcs/navigate.ts'
import DifficultyStars from '@/components/special/difficulty-stars.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  sectionId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  expression: {
    type: String,
    default: ''
  },
  parameters: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  difficulty: {
    type: Number,
    default: 0
  },
  subjectId: {
    type: String,
    required: true
  },
})

const navigateToCard = () => {
  navigateTo(`/subject/${props.subjectId}/${props.sectionId}/${props.id}`)
}
</script>

<template>
  <div
    class="bg-white rounded-3xl w-full p-5 hover:shadow-lg transition-all duration-200 cursor-pointer  border-gray-100 hover:border-gray-200"
    @click="navigateToCard"
  >
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl sm:text-3xl font-medium">{{ props.name }}</h1>
        <p class="text-gray-600 text-sm">{{ props.description }}</p>

        <div v-if="props.expression" class="mt-1 p-2 bg-gray-50 rounded-lg text-sm font-mono">
          {{ props.expression }}
        </div>

      </div>

      <div class="flex items-center justify-end mt-2 sm:mt-0">
        <DifficultyStars :diff="props.difficulty" />
      </div>
    </div>
  </div>
</template>
