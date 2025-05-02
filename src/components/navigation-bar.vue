<script setup lang="ts">
import { Book, Home, Search, Star, User } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const els = [
  { url: "/", icon: Home, label: "Главная" },
  { url: "/subjects", icon: Book, label: "Формулы" },
  { url: "/ai", icon: Star, label: "AI" },
  { url: "/search", icon: Search, label: "Поиск" },
  { url: "/profile", icon: User, label: "Профиль" },
];

const url : string = computed(() => {
  return window.location.pathname.toLowerCase()
})


const navigateTo = (path: string) => {
  window.location.href = path;
}

const shouldHideNavbar = computed(() => {
  return ['/onboarding', '/ai'].some(path => url.value.includes(path));
});


const hoverIndex = ref(-1);
</script>

<template>
  <div v-if="!shouldHideNavbar" class=" fixed bottom-0 left-0 w-full flex justify-center">
    <div class="navbar-container relative px-4 border-gray-300 border-t  w-[100%] flex items-center justify-between overflow-hidden">
      <div
        v-for="(item, index) in els"
        :key="index"
        class="nav-item relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 py-3"
        @click="navigateTo(item.url)"
      >
        <div
          class="icon-box relative flex items-center justify-center transition-all duration-500"
        >
          <component
            :is="item.icon"
            class="transition-all duration-300 relative z-10"
            size="20"
          />

          <div
            class="decoration absolute inset-0 transition-all duration-500"
          ></div>
        </div>

        <span
          class="text-xs mt-2 transition-all duration-300 font-medium"
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
