<script setup lang="ts">
const props = defineProps({
  text: {
    required: true,
    type: String,
  },
})
const emits = defineEmits(['onClick']);
</script>

<template>
  <button
    @click="emits('onClick')"
    class=" text-white h-[100px] text-[24px] flex justify-center items-center text-center rounded-[40px]  bg-main-blue px-[140px] py-10"
  >
    {{props.text}}
  </button>
</template>

<style scoped>
button{
  width: calc(100vw - 32px);
}
</style>
