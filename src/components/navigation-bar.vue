<script setup lang="ts">
import { Book, Home, Search, Star, User } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const els = [
  { url: "/", icon: Home, label: "Главная" },
  { url: "/subjects", icon: Book, label: "Формулы" },
  { url: "/Ai", icon: Star, label: "AI" },
  { url: "/Search", icon: Search, label: "Поиск" },
  { url: "/Profile", icon: User, label: "Профиль" },
];

const url : string = computed(() => {
  return window.location.pathname.toLowerCase()
})

const activeIndex = computed(() => {
  if (url.value === '/') return 0;
  return els.findIndex(item => url.value.startsWith(item.url.toLowerCase()));
})

const navigateTo = (path: string) => {
  window.location.href = path;
}

const hoverIndex = ref(-1);
</script>

<template>
  <div v-if="!url.includes('onboarding')" class=" fixed bottom-0 left-0 w-full flex justify-center">
    <div class="navbar-container relative w-[100%] flex items-center justify-between overflow-hidden">
      <div
        v-for="(item, index) in els"
        :key="index"
        class="nav-item relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 py-3"
        :class="{ 'active': activeIndex === index }"
        @click="navigateTo(item.url)"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = -1"
      >
        <div
          class="icon-box relative flex items-center justify-center transition-all duration-500"
          :class="{
            'active': activeIndex === index,
            'hover': hoverIndex === index && activeIndex !== index
          }"
        >
          <component
            :is="item.icon"
            class="transition-all duration-300 relative z-10"
            :class="activeIndex === index ? 'text-white' : 'text-gray-600'"
            size="20"
          />

          <!-- Декоративный элемент -->
          <div
            class="decoration absolute inset-0 transition-all duration-500"
            :class="{
              'active': activeIndex === index,
              'hover': hoverIndex === index && activeIndex !== index
            }"
          ></div>
        </div>

        <span
          class="text-xs mt-2 transition-all duration-300 font-medium"
          :class="activeIndex === index ? 'text-purple-600' : 'text-gray-500'"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
  z-index: 10;
  width: 100%;
}

.navbar-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 80px;
}

.nav-item {
  position: relative;
  flex: 1;
  min-width: 0;
}

.icon-box {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.icon-box.hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.decoration {
  border-radius: 12px;
  background: linear-gradient(135deg, #8b5cf6, #d946ef);
  opacity: 0;
  transform: scale(0);
}

.decoration.active {
  opacity: 1;
  transform: scale(1);
}

.decoration.hover {
  opacity: 0.1;
  transform: scale(1);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #8b5cf6;
  border-radius: 50%;
}

@media (max-width: 640px) {
  .navbar-container {
    height: 75px;
  }

  .icon-box {
    width: 40px;
    height: 40px;
  }

  .nav-item span {
    font-size: 0.65rem;
  }
}
</style>
