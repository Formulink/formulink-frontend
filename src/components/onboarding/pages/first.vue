<script setup lang="ts">
import DescriptionText from '@/components/onboarding/components/description-text.vue'
import Icon_standalone from '../../../../public/icon_standalone.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-10 text-center px-4">
    <icon_standalone class="size-48" />
    <DescriptionText
      description="Ваш персональный помощник по многим дисциплинам"
      text="Добро пожаловать"
    />
  </div>
</template>
