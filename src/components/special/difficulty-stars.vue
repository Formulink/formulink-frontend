<script setup lang="ts">
import {Sparkle} from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  diff: Number
})

const color : String = computed((item: Number) =>{
  return item <= props.diff ? 'text-gold-400' : 'text-black'
})

</script>



<template>
  <div class="flex gap-2">
    <Sparkle :class="color(1)"/>
    <Sparkle :class="color(2)"/>
    <Sparkle :class="color(3)"/>
  </div>
</template>

<style scoped>

</style>
