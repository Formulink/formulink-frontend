<script setup lang="ts">
import { Heart, Clock, ChevronRight } from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'

import { computed, type PropType } from 'vue'
import {GetSectionNameById} from '@/funcs/getSectionNameById.ts'


// const props = defineProps<Formula>()

const props = defineProps({
  id: String,
  sectionId: Number,
  name: String,
  description: String,
  expression: String,
  parameters: {
    type: Array as PropType<string[]>,
  },
  difficulty: Number,
})

const sectionName = computed(()=>{
  return GetSectionNameById(props.sectionId)
})

</script>

<template>
  <div
    @click="navigateTo(`/formulas/${props.id}`)"
    class="w-full p-8 rounded-3xl shadow-2xl shadow-black/5 bg-white min-h-[150px] flex flex-col gap-2">
    <!-- header -->
    <div class="flex justify-between items-center w-full">
      <div class="flex flex-col">
        <h1 class="text-main-blue font-bold text-6xl">{{ props.name }}</h1>
      </div>
      <div class="hover:cursor-pointer flex items-center bg-white justify-center rounded-full p-2.5">
        <Heart />
      </div>
    </div>

    <!-- description -->
    <span class="font-sf-regular">{{ props.description }}</span>

    <!-- footer -->
    <div class="flex justify-between items-center w-full ">
      <div @click="navigateTo(`/formulas/${props.id}`)" class="cursor-pointer flex gap-2">
        <span
          class="text-main-blue cursor-pointer"
          @click="navigateTo(`/formulas/${props.id}`)">
          Открыть
        </span>
        <ChevronRight class="text-main-blue" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
