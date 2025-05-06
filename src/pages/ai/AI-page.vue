<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue'
import BigReturnButton from '@/components/buttons/big-return-button.vue'
import AIInput from '@/components/ai/AI-input.vue'
import { Task } from '@/types/task.ts'
import VueMarkdown from 'vue-markdown-render'
import { BotIcon, ClockIcon } from 'lucide-vue-next'

type Message = {
  content: string
  from: 'user' | 'ai'
}

const promptText: string = "Реши задачу, пожалуйста, id: "
const thinking = ref<boolean>(false)
const taskId = ref<string>('')
const task = ref<Task>()
const messages = ref<Message[]>([])
const chatContainer = ref<HTMLElement | null>(null)
const conversationId = ref<string>('')



const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')

  conversationId.value = window.location.href.split('/')[4].split('?')[0]

  await getConversation()

  if (!id) {
    taskId.value = 'nil'
    return
  }
  taskId.value = id

  try {
    thinking.value = true
    const resp = await fetch(`https://formulink.duckdns.org/task/${taskId.value}`)
    task.value = await resp.json()
    console.log("task: ", task.value)

    await solve(task.value)
  } catch (e) {
    console.error(e)
  } finally {
    thinking.value = false
  }

  scrollToBottom()
})

const solve = async (task: Task) => {
  messages.value.push({
    from: 'user',
    content: promptText + task.id,
  })

  await scrollToBottom()

  try {
    thinking.value = true
    const resp = await fetch('https://formulink.duckdns.org/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id'),
        conversation_id: conversationId.value,
        task: task,
      })
    })
    const respText = await resp.json()

    messages.value.push({
      from: 'ai',
      content: respText,
    })

    await scrollToBottom()
  } catch (e) {
    console.error(e)
  } finally {
    thinking.value = false
  }
}

const sendMessage = async (text: string) => {
  messages.value.push({
    from: 'user',
    content: text,
  })

  await scrollToBottom()

  try {
    thinking.value = true
    const resp = await fetch('https://formulink.duckdns.org/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id'),
        conversation_id: conversationId.value,
        task: task.value,
        text: text,
      })
    })
    const respText = await resp.json()

    messages.value.push({
      from: 'ai',
      content: respText,
    })

    await scrollToBottom()
  } catch (e) {
    console.error(e)
  } finally {
    thinking.value = false
  }
}

const getConversation = async () => {
  try {
    let resp = await fetch(`https://formulink.duckdns.org/conversation/${conversationId.value}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    if (resp.status !== 200) {
      return
    }
    resp = await resp.json()
    resp.text.forEach((item, index) => {
      if (index % 2 != 0) {
        messages.value.push({
          from: 'ai',
          content: item,
        })
      } else {
        messages.value.push({
          from: 'user',
          content: item,
        })
      }
    })

    nextTick(() => scrollToBottom())
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen relative p-4 md:p-8 flex flex-col gap-6 bg-gray-50">
    <div class="flex gap-4 items-center">
      <BigReturnButton url="/conversations" />
      <h1 class="font-bold text-3xl md:text-5xl">Помощник</h1>
    </div>


    <div
      ref="chatContainer"
      class="flex flex-col gap-6 h-[calc(100vh-220px)] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400">
        <BotIcon size="48" class="mb-4 text-purple-400" />
        <p class="text-lg">Начните диалог с помощником</p>
      </div>

      <template v-for="(msg, index) in messages" :key="index">

        <div v-if="msg.from === 'user'" class="flex flex-col items-end gap-1">
          <div class="flex items-end gap-2">
            <div class="flex items-center text-xs text-gray-500 mr-2">
            </div>
            <div class="bg-main-blue text-white rounded-lg px-4 py-3 shadow-sm max-w-[80%]">
              <p class="whitespace-pre-wrap break-words">{{ msg.content }}</p>
            </div>
          </div>
        </div>


        <div v-else class="flex flex-col items-start gap-1">
          <div class="flex items-end gap-2">
            <div class="bg-gray-200 rounded-full p-2 shadow-sm">
              <BotIcon size="20" class="text-gray-700" />
            </div>
            <div class="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
              <VueMarkdown
                :source="msg.content"
                class="markdown-body prose prose-sm max-w-none"
              />
            </div>
          </div>
        </div>
      </template>


      <div v-if="thinking" class="flex items-end gap-2 self-start">
        <div class="bg-gray-200 rounded-full p-2 shadow-sm">
          <BotIcon size="20" class="text-gray-700" />
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="absolute bottom-4 left-0 w-full px-4 md:px-6 pb-4 md:pb-8">
      <AIInput
        v-if="taskId"
        :thinking="thinking"
        :defaultText="''"
        @send-message="sendMessage"
        class="border border-gray-300 rounded-full shadow-sm"
      />
    </div>
  </div>
</template>

<style scoped>

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 20px;
}

.markdown-body {
  font-size: 0.95rem;
}

.markdown-body pre {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.75rem;
  overflow-x: auto;
}

.markdown-body code {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
}

.markdown-body pre code {
  background-color: transparent;
  padding: 0;
}

.markdown-body ul, .markdown-body ol {
  padding-left: 1.5rem;
}

.markdown-body blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  color: #6b7280;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

.markdown-body table th, .markdown-body table td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
}

.markdown-body table th {
  background-color: #f9fafb;
}


@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
