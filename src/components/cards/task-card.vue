<script setup lang="ts">
import { ref } from 'vue'
import DifficultyStars from '@/components/special/difficulty-stars.vue'
import AskHelpButton from '@/components/buttons/ask-help-button.vue'

const props = defineProps({
  number: Number,
  id: String,
  formulaId: String,
  difficulty: Number,
  task_text: String,
  result: Number,
})

const toggleResult = ref<boolean>(false)
</script>

<template>
  <div v-if="id" class="w-full p-4 rounded-3xl flex flex-col gap-4 bg-white">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl">Задача {{props.number}}</h1>
      <AskHelpButton :task-id="id"/>
    </div>
    <DifficultyStars :diff="difficulty" />
    <div class="flex flex-col gap-4">
      <span>{{props.task_text}}</span>
      <button
        @click="toggleResult = !toggleResult"
        class="text-gray-700 hover:text-black"
      >
        {{toggleResult ? 'Скрыть ответ': 'Показать ответ'}}
      </button>
      <span v-if="toggleResult">{{props.result}}</span>
    </div>
  </div>
</template>

