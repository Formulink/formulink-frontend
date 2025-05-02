<script setup lang="ts">
import {ArrowUp, Loader} from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
  defaultText: String,
  thinking: Boolean,
})

const emit = defineEmits(['changeText', 'sendMessage'])

const handleKeyDown = (e: KeyboardEvent): void => {
  if (e.key === 'Enter') {
    handleSend()
  }
}

const handleSend = () =>{
  text.value = ''
  emit('sendMessage')
}

const text = ref<string>(props.defaultText)

</script>

<template>

  <div class=" w-full flex justify-between bg-gray-100 p-2 rounded-full ">
    <input placeholder="Напишите сообщение"
           @keydown="handleKeyDown"
           v-model="text"
           class="px-4 w-full focus:ring-0 focus:outline-0 bg-transparent text-md placeholder-gray-400"/>

    <button
      :disabled="thinking"
      @click="handleSend"
      :class="props.thinking ? 'bg-blue-900' : 'bg-blue-700'"
      class="rounded-full p-2 ">

      <ArrowUp v-if="!thinking" class="text-white"/>
      <Loader v-else class="animate-spin  text-white"/>
    </button>
  </div>
</template>

<style scoped>

</style>
