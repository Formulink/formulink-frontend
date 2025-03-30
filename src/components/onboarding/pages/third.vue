<script setup lang="ts">
import DescriptionText from '@/components/onboarding/components/description-text.vue'
import GrapeCircles from '../../../../public/gifs/grape-circles.vue'
</script>

<template>
  <div class="w-full h-full text-center overflow-hidden">
    <div class="mt-20 h-full flex flex-col justify-between items-center  pb-[350px]">
      <grape-circles/>
      <DescriptionText description="При попадении в тупик вы всегда можете обратиться к нашему виртуальному ассистенту!"
                       text="Наличие AI"/>
    </div>

  </div>
</template>

