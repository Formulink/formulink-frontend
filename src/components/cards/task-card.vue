<script setup lang="ts">
import { ref } from 'vue'
import DifficultyStars from '@/components/special/difficulty-stars.vue'

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

      <button class="neuro-button relative px-6 py-2.5 rounded-full font-medium text-white overflow-hidden">
        <span class="relative z-10">Помощь</span>
        <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600"></div>
        <div class="particle-container absolute inset-0"></div>
      </button>
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

<style scoped>
.neuro-button {
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
}

.neuro-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
}

.neuro-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.particle-container::before,
.particle-container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 10.5%),
    radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 10.5%);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  mask-image: radial-gradient(ellipse at center, transparent 70%, black 100%);
  animation: sparkle 4s linear infinite;
  opacity: 0.3;
}

.particle-container::after {
  animation-delay: -2s;
  background-size: 20px 20px;
  background-position: 5px 5px, 15px 15px;
}

@keyframes shine {
  0% {
    left: -100%;
    opacity: 0;
  }
  20% {
    left: 100%;
    opacity: 0.6;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes sparkle {
  0% {
    background-position: 0px 0px, 15px 15px;
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    background-position: 30px 60px, 45px 75px;
    opacity: 0.3;
  }
}
</style>
