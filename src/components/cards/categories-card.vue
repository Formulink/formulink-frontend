<script setup lang="ts">
import {ZapIcon} from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'

const props = defineProps({
  id : Number,
  subjectId: Number,
  name: String,
  description: String,
})

</script>

<template>
  <div class="p-6 w-full flex gap-4 items-center bg-white rounded-3xl cursor-pointer" @click="navigateTo('/')">
    <div class="flex items-center justify-center p-4 rounded-[50%] bg-gradient-to-b from-blue-800 to-blue-700">
      <ZapIcon class="text-white"/>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-lg">{{props.name}}</span>
      <span class="text-sm text-black/60">{{props.description}}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
