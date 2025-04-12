<script setup lang="ts">

import navigateTo from '@/funcs/navigate.ts'
import {ZapIcon } from 'lucide-vue-next'

const props = defineProps({
  id: Number,
  subjectId: Number,
  description: String,
  name: String,
})
</script>

<template>
  <div @click="navigateTo(`/subject/${props.subjectId}/${props.id}`)" class="rounded-3xl bg-white p-6 flex gap-8 items-center ">
    <div class="flex items-center justify-center p-6 rounded-[50%] bg-gradient-to-b from-blue-800 to-blue-700">
      <ZapIcon class="text-white"/>
    </div>

    <div class="flex flex-col gap-1">
      <h1 class="md:text-4xl text-3xl">
        {{props.name}}
      </h1>
      <span class="text-black/70">{{props.description}}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
