<script setup lang="ts">
import {Heart, Clock, ChevronRight} from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'
const props = defineProps({
  seq: String,
  f: String,
  description: String,
  addedTime: String,
  liked: Boolean,
  url: String,
})
</script>

<template>
  <div class="w-full p-4 rounded-2xl shadow-2xl shadow-black/5 gr min-h-[150px] flex flex-col gap-2">
<!--    header-->
    <div class="flex justify-between items-center w-full">
      <div class="flex flex-col">
        <span class="text-lg text-basic-gradient">{{props.seq.toUpperCase()}}</span>
        <h1 class="text-main-blue font-bold text-5xl">{{props.f}}</h1>
      </div>
      <div class="hover:cursor-pointer flex items-center bg-white justify-center rounded-full p-2.5">
        <Heart/>
      </div>
    </div>

<!--    description-->
    <span class="font-sf-regular">{{props.description}}</span>

<!--    footer-->
    <div class="flex justify-between items-center w-full ">
      <div class="flex gap-2">
        <Clock class="text-black/40"/>
        <span class="font-sf-regular text-black/40">Добавлено 2 дня назад</span>
      </div>
      <div @click="navigateTo(props.url)" class="cursor-pointer flex gap-2">
        <span class="text-main-blue">Открыть</span>
        <ChevronRight class="text-main-blue"/>
      </div>
    </div>
  </div>
</template>



<style scoped>
.gr{
  @apply bg-gradient-to-b from-blue-50 to-[#FCF4FC];
}
</style>
