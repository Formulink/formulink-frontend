<script setup lang="ts">
import {ArrowLeft} from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'

const props = defineProps({
  url: String,
})
</script>

<template>
  <ArrowLeft
    @click="navigateTo(url)"
    class="size-8 text-gray-600 hover:text-black" />
</template>

<style scoped>

</style>
