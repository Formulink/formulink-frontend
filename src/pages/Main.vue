<script setup lang="ts">
import { Search } from 'lucide-vue-next'

import Icon_standalone from '../../public/icon_standalone.vue'
import FDay from '@/components/main/FDay.vue'
</script>


<template>
  <div class="w-screen h-screen flex flex-col p-8 gap-6">
    <icon_standalone class="size-12"/>

<!--    search-->
    <div class="appearing relative">
      <input
        class=" shadow-sm w-full font-regular focus:ring-0 focus:bg-gray-50 focus:outline-none border placeholder-gray-300 text-gray-400  border-gray-100 pl-10 px-2 py-3 rounded-xl "
        placeholder="Поиск формул..."
      />
      <Search class="absolute bottom-1/4 left-[10px] text-gray-300"/>
    </div>

<!--    f of the day-->
    <div class="appearing flex flex-col text-start gap-4 ">
      <h1 class="text-3xl font-sf-bold">Формула дня</h1>
      <FDay f="F = ma" seq="text"/>
    </div>


<!--   categories -->
    <div class="appearing flex flex-col text-start gap-4">
      <h1 class="text-3xl font-sf-bold">Категория</h1>
<!--сюды айтем-->
    </div>

    <div class="appearing flex flex-col text-start gap-4 ">
      <h1 class="text-3xl font-sf-bold">Недавно просмотрено</h1>
      <!--сюды айтем-->
    </div>

  </div>

</template>


<style>
.appearing{
  transform: translateY(20px);
  opacity: 0;
  animation: appear 0.2s ease-in forwards;
}

@keyframes appear {
  from{
    transform: translateY(20px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
}

.appearing:nth-child(1) {
  animation-delay: 0s;
}
.appearing:nth-child(2) {
  animation-delay: 0.1s;
}
.appearing:nth-child(3) {
  animation-delay: 0.2s;
}
.appearing:nth-child(4) {
  animation-delay: 0.3s;
}
.appearing:nth-child(5) {
  animation-delay: 0.4s;
}


</style>
