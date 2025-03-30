<script setup lang="ts">
import OnboardingButton from '@/components/onboarding/Onboarding-button.vue'
import Icon from '../../public/icon.vue'
import DescriptionText from '@/components/onboarding/description-text.vue'
</script>

<template>
  <div class="w-screen h-screen text-center p-8 flex flex-col items-center">
    <div class="mt-20 flex flex-col justify-between items-center  pb-40">
      <icon class="mt-20 mr-10" />
      <DescriptionText description="Ваш персональный помощник по многим дисциплинам" text="Добро пожаловать"/>
    </div>

    <OnboardingButton class="absolute  bottom-[34px]" text="Начать"/>
  </div>
</template>

