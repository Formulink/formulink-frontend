
<template>
    <RouterView/>
    <NavigationBar class="relative" />
</template>

<style>
.text-basic-gradient{
  @apply bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text;
}
</style>
<script setup lang="ts">
import NavigationBar from '@/components/navigation-bar.vue'
</script>
