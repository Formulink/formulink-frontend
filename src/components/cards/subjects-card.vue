<script setup lang="ts">

import navigateTo from '@/funcs/navigate.ts'
import {AtomIcon, SigmaIcon, Lock} from 'lucide-vue-next'

const props = defineProps({
  id: Number,
  name: String,
})
</script>

<template>
  <div @click="navigateTo(`/subject/${id}/`)" class="rounded-3xl bg-white p-8 flex gap-8 items-center ">
    <div class="flex justify-center items-center p-6 rounded-full bg-gradient-to-b from-violet-300 to-violet-500">
      <AtomIcon class="text-white" v-if="name?.toLowerCase() == 'физика'"/>
      <SigmaIcon class="text-white" v-else-if="name?.toLowerCase() == 'математика'"/>
      <Lock class="text-white" v-else/>
    </div>

    <h1 class="text-4xl">
      {{props.name}}
    </h1>
  </div>
</template>

<style scoped>

</style>
