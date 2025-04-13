<script setup lang="ts">
import { Sparkle } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  diff: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 0 && value <= 3
  }
})

const starsArray = [1, 2, 3]

const isStarActive = (starIndex: number) => {
  return starIndex <= props.diff
}

const getStarClass = (starIndex: number) => {
  return isStarActive(starIndex)
    ? 'text-amber-400 fill-amber-400'
    : 'text-gray-300'
}


const difficultyLabel = computed(() => {
  const labels = ['No difficulty', 'Easy', 'Medium', 'Hard']
  return labels[props.diff] || 'Unknown difficulty'
})
</script>

<template>
  <div class="flex items-center gap-1" aria-label="Difficulty level" :title="difficultyLabel">
    <span class="sr-only">{{ difficultyLabel }}</span>
    <Sparkle
      v-for="index in starsArray"
      :key="index"
      :class="[getStarClass(index), 'w-5 h-5 transition-all duration-200']"
    />
  </div>
</template>
