<script setup lang="ts">
import {ArrowLeft} from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'
const props = defineProps({
  url: String,
})

</script>


<template>
  <div @click="navigateTo(url)" class="flex items-center gap-4">
  <button
    class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
  >
    <ArrowLeft class="w-5 h-5" />
    <span>Назад</span>
  </button>
  <!--      <Icon_standalone class="size-10" /> -->
  </div>
</template>
