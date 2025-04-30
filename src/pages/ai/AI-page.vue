<script setup lang="ts">
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'
import BigReturnButton from '@/components/buttons/big-return-button.vue'
import AIInput from '@/pages/ai/AI-input.vue'
import { nextTick } from 'vue'

const scrollToBottom = () => {
  nextTick(() => {
    const el = document.querySelector('.scroll-anchor')
    el?.scrollIntoView({ behavior: 'smooth' })
  })
}


const message = ref('message')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

type Message = {
  id: number
  content: string
  from: 'user' | 'ai'
}

const messages = ref<Message[]>([])
let messageId = 0


const sendMessage = () => {
  const content = message.value.trim()
  if (!content) return

  // Добавляем сообщение пользователя
  messages.value.push({
    id: messageId++,
    content,
    from: 'user',
  })

  message.value = ''
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  setTimeout(() => {
    messages.value.push({
      id: messageId++,
      content: `Ответ на: "${content}"`,
      from: 'ai',
    })
  }, 500)
}



</script>

<template>
  <div class="min-h-screen relative p-8 flex flex-col gap-6 bg-gray-50">
    <div class="flex gap-4 items-center">
      <BigReturnButton />
      <h1 class="font-bold text-5xl">Помощник</h1>
    </div>
    <div class="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="msg.from === 'user' ? 'self-end bg-purple-100' : 'self-start bg-gray-200'"
        class="max-w-[75%] rounded-3xl px-6 py-4 text-sm shadow"
      >
        {{ msg.content }}
      </div>
    </div>


    <div class="absolute bottom-0 left-0 w-full px-6 pb-6 md:pb-8">
      <AIInput @send-message="sendMessage" class=" border border-gray-300"/>
    </div>
    <div class="min-h-[100px]" />
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
