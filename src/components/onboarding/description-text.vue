<script setup lang="ts">
const props = defineProps({
  text: {
    required: true,
    type:String
  },
  description: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <div class="flex flex-col text-center">
    <h1
      class="text-4xl text-basic-gradient"
    >
      {{props.text}}
    </h1>
    <span
      class="text-lg text-white/60"
    >
      {{props.description}}
    </span>

  </div>
</template>

<style scoped>

</style>
