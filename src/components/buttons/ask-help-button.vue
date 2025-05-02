<script setup lang="ts">
import navigateTo from '@/funcs/navigate.ts'

const props = defineProps({
  taskId: String,
})
</script>

<template>
  <button
    @click="navigateTo(`/ai?id=${props.taskId}`)"
    class="neuro-button relative px-6 py-2.5 rounded-full font-medium text-white overflow-hidden">
    <span class="relative z-10 text-black">Помощь</span>
  </button>
</template>

<style scoped>
.neuro-button {
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
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
