<script setup lang="ts">
import {ArrowUp} from 'lucide-vue-next'

const emit = defineEmits(['changeText', 'sendMessage'])
</script>

<template>

  <div class=" w-full flex justify-between bg-gray-100 p-2 rounded-full ">
    <input placeholder="Напишите сообщение"
           class="px-4 w-full focus:ring-0 focus:outline-0 bg-transparent text-md placeholder-gray-400"/>
    <div @click="emit('sendMessage')" class="rounded-full p-2 bg-blue-700">
      <ArrowUp class="text-white"/>
    </div>
  </div>
</template>

<style scoped>

</style>
