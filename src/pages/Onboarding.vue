<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import First from '@/components/onboarding/pages/first.vue'
import Second from '@/components/onboarding/pages/second.vue'
import Third from '@/components/onboarding/pages/third.vue'
import Fourth from '@/components/onboarding/pages/fourth.vue'
import OnboardingButton from '@/components/onboarding/components/Onboarding-button.vue'
import navigateTo from '@/funcs/navigate.ts'

const currentPage = ref<number>(1);

const currentPageComponent = computed(() => {
  switch (currentPage.value) {
    case 1: return First;
    case 2: return Second;
    case 3: return Third;
    case 4: return Fourth;
    case 5: return navigateTo("/");
  }
});

const nextButtonText = computed(() => {
  switch (currentPage.value) {
    case 1: return "Начать"
    case 2: return "Дальше"
    case 3: return "Дальше"
    case 4: return "Вперед!"
  }
})

const username = ref<string>('1234')
const userId = ref<number>(1234)
const tg = ref()

const response = ref()

onMounted(async () => {
  tg.value = window.Telegram.WebApp

  username.value = tg.value?.initDataUnsafe.user?.username || '1234'
  userId.value = tg.value?.initDataUnsafe.user?.id?.toString() || 1234

  if (username.value != '' && userId.value != 0) {
    try {
      const r = await fetch('https://formulink.duckdns.org/auth', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          telegram_id: userId.value,
          username: username.value
        })
      })
      const resp = await r.json()
      console.log(resp)
      localStorage.setItem('user_id', resp.user_id)


    } catch (e) {
      console.error(e)
    }
  }
})


const changeCurrentPage = () => {
  if (currentPage.value < 5) {
    currentPage.value++;
  }
};
</script>

<template>
  <div class=" h-dvh text-center overflow-hidden flex items-center justify-center relative">
    <transition name="slide" mode="out-in">
      <component :is="currentPageComponent" :key="currentPage" class="absolute w-full h-full flex items-center justify-center"/>
    </transition>


    <transition name="fade">
      <div v-if="currentPage != 1" class="absolute bottom-[200px] flex gap-1">
        <div class="size-4 rounded-full" :class="currentPage == 2 ? 'bg-main-blue' : 'bg-black'"></div>
        <div class="size-4 rounded-full" :class="currentPage == 3 ? 'bg-main-blue' : 'bg-black'"></div>
        <div class="size-4 rounded-full" :class="currentPage == 4 ? 'bg-main-blue' : 'bg-black'"></div>
      </div>
    </transition>
    <OnboardingButton @click="changeCurrentPage" class="absolute bottom-[34px]" :text="nextButtonText"/>
  </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}

.slide-enter-from {
  transform: translateX(10%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-10%);
  opacity: 0;
}
</style>
