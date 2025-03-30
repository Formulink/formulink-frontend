<script setup lang="ts">
import { Book, Home, Search, Star, User } from 'lucide-vue-next'
import navigateTo from '@/composables/navigate.ts'
const els = [
  {url: "/", icon: Home},
  {url: "/Formulas", icon: Book},
  {url: "/Ai", icon: Star},
  {url: "/Search", icon: Search},
  {url: "/Profile", icon: User},
];

</script>

<template>
  <div class="absolute bottom-0 left-0">

    <div class="w-screen bg-white/80 flex items-center px-[10vw] justify-between gap-2 backdrop-blur-sm h-[80px] border border-t border-gray-200">
      <div
        v-for="(item, index) in els"
        :key="index"
        class="flex  flex-col items-center justify-center cursor-pointer"
        @click="navigateTo(item.url)"
      >
        <Component class="text-gray-600" :is="item.icon"/>
<!--        <span class="text-gray-600" >{{item.url == '/' ? 'Home' : item.url.split('/')[1] }}</span>-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
