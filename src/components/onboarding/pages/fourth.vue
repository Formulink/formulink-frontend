<script setup lang="ts">
import DescriptionText from '@/components/onboarding/components/description-text.vue'
import Search_img from '../../../../public/gifs/search_img.vue'
</script>

<template>
  <div class="w-full h-full text-center overflow-hidden">
    <div class="mt-20 h-full flex flex-col justify-between items-center  pb-[350px]">
      <search_img/>
      <DescriptionText description="Поиск не только по названию, но и по компонентам формулы!"
                       text="Продуманный поиск"/>
    </div>

  </div>
</template>

