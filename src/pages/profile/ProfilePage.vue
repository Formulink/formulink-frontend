<script setup lang="ts">
import { ArrowRight, Clock, ThumbsUp, Bug} from 'lucide-vue-next'
import Icon_standalone from '../../../public/icon_standalone.vue'
import Avatar from "vue-boring-avatars";
import navigateTo from '@/funcs/navigate.ts'



const data = [
  { text: "Недавно просмотрено", path: "/recently", icon: Clock},
  { text: "Избранное", path: "/favorites", icon: ThumbsUp},
  { text: "Написать в поддержку", path: "https://t.me/laynexx", icon: Bug},
]

</script>

<template>
  <div class="min-h-screen p-8 flex flex-col gap-6 bg-gray-50">
    <h1 class="font-bold text-5xl">Профиль</h1>

<!--    avatar-->
    <div class="p-4 bg-white rounded-3xl  appearing w-full flex flex-col gap-2 justify-center items-center">
      <Avatar  variant="bauhaus" name="lx"  class="size-32"/>
      <span>@laynexx</span>
    </div>

<!--    btns-->
    <div
      class="mt-10 flex flex-col gap-4">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="appearing p-5 rounded-2xl bg-white flex justify-between items-center cursor-pointer"
        @click="navigateTo(item.path)"
      >

        <div class=" flex gap-2">
          <component class="fill-amber-50 text-main-blue" :is="item.icon" />
          <span>{{item.text}}</span>
        </div>
        <ArrowRight/>
      </div>

    </div>
    <div class="min-h-[100px]"/>
  </div>
</template>
