<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import BigReturnButton from '@/components/buttons/big-return-button.vue'
import AIInput from '@/components/ai/AI-input.vue'
import { Task } from '@/types/task.ts'

type Message = {
  id: number
  content: string
  from: 'user' | 'ai'
}

const promptText : string = "Реши задачу, пожалуйста, id: "
const thinking = ref<boolean>(false);

const scrollToBottom = () => {
  nextTick(() => {
    const el = document.querySelector('.scroll-anchor')
    el?.scrollIntoView({ behavior: 'smooth' })
  })
}

const taskId = ref<string>('')
const task = ref<Task>()

onMounted( async ()=>{
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')

  if (!id) {
    taskId.value = 'nil'
    return
  }

  taskId.value = id
  try{
    thinking.value = true
    const resp = await fetch(`http://localhost:8082/task/${taskId.value}`, )
    task.value = await resp.json()
    console.log("task: ", task.value)

    // sendMessage()
  } catch(e) {
    console.error(e)
  } finally {
    thinking.value = true
  }
})




</script>

<template>
  <div class="min-h-screen relative p-8 flex flex-col gap-6 bg-gray-50">
    <div class="flex gap-4 items-center">
      <BigReturnButton url="/" />
      <h1 class="font-bold text-5xl">Помощник</h1>
    </div>
    <div class="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="msg.from === 'user' ? 'self-end bg-purple-100' : 'self-start bg-gray-200'"
        class="max-w-[75%] rounded-2xl px-6 py-4 text-sm shadow"
      >
        {{ msg.content }}
      </div>
    </div>


    <div class="absolute bottom-4 left-0 w-full px-6 pb-6 md:pb-8">
      <AIInput  v-if="taskId" :defaultText="taskId !== 'nil' ? promptText + taskId : ''" @send-message="sendMessage" class=" border border-gray-300"/>
    </div>
  </div>
</template>

<style scoped>
textarea {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

textarea:focus {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
