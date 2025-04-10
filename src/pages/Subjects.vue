<script setup lang="ts">
import Icon_standalone from '/public/icon_standalone.vue'
import SubjectsCard from '@/components/subjects-card.vue'
import { onMounted, ref } from 'vue'
import type { Subject } from '@/types/subject.ts'

const subjects = ref<Subject[]>([])

onMounted(async ()=>{
  const response = await fetch("http://localhost:8082/subjects")
  subjects.value = await response.json()

})
</script>



<template>
  <div class="w-screen h-screen flex flex-col p-8 gap-6">
    <icon_standalone class="size-12"/>

    <div v-if="subjects" class=" w-full flex flex-col gap-6">
      <h1 class="font-bold text-5xl">Предметы</h1>
      <SubjectsCard
        v-for="(item, index) in subjects"
        :key="index"
        :name = item.name
        :id = item.id
      />
    </div>
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
