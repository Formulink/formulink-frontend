<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {Plus, Trash} from 'lucide-vue-next'
import type { Conversation } from '@/types/conversation.ts'
import navigateTo from '@/funcs/navigate.ts'

const conversations = ref<Conversation>()

onMounted(async () =>{
  await updateConversations()
})

const updateConversations = async () => {
  try{
    const resp = await fetch(`https://formulink.duckdns.org/conversations/${localStorage.getItem('user_id')}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    conversations.value = await resp.json()
  } catch(e){
    console.error(e)
  }
}

const deleteConversation = async (conversationId : string) =>{
  try{
    await fetch(`https://formulink.duckdns.org/conversation/${conversationId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
  } catch (e){
    console.error(e)
  } finally {
    await updateConversations()
  }
}

const newConversation = async () => {
  try{
    await fetch("https://formulink.duckdns.org/conversation/new", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id')
      })
    })
  } catch (e) {
    console.error(e)
  } finally {
    await updateConversations()
  }
}

</script>



<template>
  <div class="overflow-hidden h-dvh flex flex-col p-8 gap-6">
    <div class="overflow-hidden w-full flex flex-col gap-6">
      <h1 class="font-bold text-5xl appearing">Диалоги</h1>
      <div class="flex flex-col gap-6">


        <div

          v-for="(item, index) in conversations"
          @click.self="navigateTo(`/ai/${item.id}`)"
          class="appearing  w-full p-6 bg-white rounded-3xl text-left gap-4 flex justify-between items-center"
        >
          <span class="w-full">Conversation {{index+1}}</span>
          <span class="w-full text-sm text-black/60 text-left">{{new Date(item.created_at).toLocaleString()}} </span>

          <button
            @click="deleteConversation(item.id)"
            class="p-2 rounded-2xl flex items-center justify-center bg-red-100">
            <Trash
              class="size-5"
            />
          </button>
        </div>


      </div>
    </div>
  </div>
  <button
    @click="newConversation"
    class="absolute text-5xl rounded-3xl p-6 flex justify-center items-center text-center text-white bg-main-blue right-6 bottom-24">
    <Plus/>
  </button>
</template>
