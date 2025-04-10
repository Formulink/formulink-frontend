<script setup lang="ts">

import Icon_standalone from '/public/icon_standalone.vue'
import SubjectsCard from '@/components/subjects-card.vue'
</script>



<template>
  <div class="w-screen h-screen flex flex-col p-8 gap-6">
    <icon_standalone class="size-12"/>

    <SubjectsCard

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
