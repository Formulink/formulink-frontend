<script setup lang="ts">
import DescriptionText from '@/components/onboarding/components/description-text.vue'
import Jumping_circle from '../../../../public/gifs/jumping_circle.vue'
</script>

<template>
  <div class="w-full h-full text-center overflow-hidden">
    <div class="mt-20 h-full flex flex-col justify-between items-center  pb-[350px]">
      <jumping_circle/>
      <DescriptionText description="Весь контент разделен на разделы и подразделы, не потеряешься!" text="Удобство"/>
    </div>

  </div>
</template>

