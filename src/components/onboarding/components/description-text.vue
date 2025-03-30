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
      class="text-[32px] font-semibold text-basic-gradient"
    >
      {{props.text}}
    </h1>
    <span
      class="font-sf-regular text-[16px] max-w-[300px] text-black/60"
    >
      {{props.description}}
    </span>

  </div>
</template>

<style scoped>

</style>
