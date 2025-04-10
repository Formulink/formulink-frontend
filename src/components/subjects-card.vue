<script setup lang="ts">
import {PlusIcon} from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'

const props = defineProps({
  id: Number,
  name: String,
})
</script>

<template>
  <div @click="navigateTo(`/${id}/`)" class="rounded-3xl bg-white p-8 flex gap-8 items-center ">
    <div class="flex justify-center items-center p-6 rounded-full bg-gradient-to-b from-violet-300 to-violet-500">
      <PlusIcon/>
    </div>

    <h1 class="text-4xl">
      {{props.name}}
    </h1>
  </div>
</template>

<style scoped>

</style>
