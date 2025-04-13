<script setup lang="ts">
import { Search, X, ArrowRight } from 'lucide-vue-next'
import { onMounted, type PropType, ref, watch, computed } from 'vue'
import type { Formula } from '@/types/formula.ts'
import EnhancedSearchResults from './EnhancedSearchResults.vue'
import SearchResults from '@/components/special/search-results.vue'

const props = defineProps({
  formulas: {
    required: true,
    type: Array as PropType<Formula[]>
  }
})

const focused = ref(false)
const inputFilter = ref('')
const inputElement = ref(null)
const showClearButton = computed(() => inputFilter.value.length > 0)

const clearSearch = () => {
  inputFilter.value = ''
  if (inputElement.value) {
    inputElement.value.focus()
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    clearSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="search-container relative w-full">
    <div
      class="search-input-wrapper relative w-full transition-all duration-300"
      :class="{ 'shadow-lg': focused }"
    >
      <input
        autofocus
        ref="inputElement"
        v-model="inputFilter"
        @focus="focused = true"
        @blur="() => setTimeout(() => focused = false, 100)"
        class="search-input w-full h-16 pl-14 pr-12 text-lg md:text-xl rounded-full border-2 transition-all duration-300 outline-none"
        :class="[
          focused ? 'border-purple-400 shadow-sm' : 'border-gray-200',
          showClearButton ? 'pr-12' : 'pr-5'
        ]"
        placeholder="Введите название или выражение..."
        autocomplete="off"
      />

      <div class="absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300"
           :class="focused ? 'text-purple-500' : 'text-gray-400'">
        <Search :size="22" />
      </div>

      <button
        v-if="showClearButton"
        @click="clearSearch"
        class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
      >
        <X :size="18" />
      </button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <SearchResults
        v-if="inputFilter.trim() !== ''"
        :formulas="props.formulas"
        :filter="inputFilter"
      />
    </transition>
  </div>
</template>

<style scoped>
.search-container {
  z-index: 50;
}

.search-input {
  background-color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  caret-color: #a855f7;
}

.search-input::placeholder {
  color: #d1d5db;
}

.search-input-wrapper {
  border-radius: 9999px;
}
</style>
