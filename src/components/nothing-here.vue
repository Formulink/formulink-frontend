<script setup lang="ts">
import { Home, RefreshCw, Search } from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center py-16 px-4">
    <!-- Illustration -->
    <div class="mb-8 relative">
      <div class="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center">
        <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <Search class="w-12 h-12 text-gray-500" />
          </div>
        </div>
      </div>
      <!-- Decorative elements -->
      <div class="absolute -top-4 -right-4 w-8 h-8 bg-emerald-200 rounded-full opacity-70 animate-pulse"></div>
      <div class="absolute -bottom-2 -left-6 w-6 h-6 bg-amber-200 rounded-full opacity-70 animate-pulse" style="animation-delay: 0.5s"></div>
      <div class="absolute top-1/2 -right-8 w-4 h-4 bg-blue-200 rounded-full opacity-70 animate-pulse" style="animation-delay: 1s"></div>
    </div>

    <!-- Text content -->
    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">К сожалению тут ничего нет :(</h1>
    <p class="text-lg text-gray-600 max-w-md text-center mb-8">
      Запрашиваемый контент не найден или еще не добавлен в нашу базу данных.
    </p>

    <!-- Action buttons -->
    <div class="flex flex-wrap gap-4 justify-center">
      <button @click="navigateTo('/')" class="flex items-center gap-2 p-5 bg-gray-200 rounded-full text-gray-700 font-medium transition-colors">
        <Home class="w-5 h-5" />
        <span>На главную</span>
      </button>
    </div>

    <!-- Additional help text -->
    <div class="mt-12 text-sm text-gray-500 max-w-sm text-center">
      Если вы считаете, что произошла ошибка, пожалуйста,
      <a href="#" class="text-main-blue hover:underline">сообщите нам</a> об этом.
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
