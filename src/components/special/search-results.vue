<script setup lang="ts">
import { computed, type PropType, ref, watch } from 'vue'
import type { Formula } from '@/types/formula.ts'
import { ArrowUpRight } from 'lucide-vue-next'
import navigateTo from '@/funcs/navigate.ts'

const props = defineProps({
  formulas: {
    required: true,
    type: Array as PropType<Formula[]>
  },
  filter: {
    type: String,
    required: true
  }
})

const filteredFormulas = computed(() => {
  if (!props.filter || props.filter.trim() === '') {
    return []
  }

  const searchTerm = props.filter.toLowerCase().trim()
  return props.formulas
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.expression.toLowerCase().includes(searchTerm)
    )
    .slice(0, 20)
})

const highlightMatch = (text, term) => {
  if (!term) return text

  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<span class="bg-purple-100 text-purple-800">$1</span>')
}

</script>

<template>
  <div class="results-container mt-3 w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">


    <div >
      <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <p class="text-sm text-gray-500">Найдено результатов: {{ filteredFormulas.length }}</p>
      </div>

      <div class="max-h-[60vh] overflow-y-auto">
        <div
          v-for="(formula, index) in filteredFormulas"
          :key="index"
          @click="navigateTo(`/formulas/${formula.id}`)"
          class="formula-item p-4 hover:bg-purple-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium text-gray-900" v-html="highlightMatch(formula.name, props.filter)"></h3>
              <div class="mt-1 flex items-center">
                <div class="formula-expression px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 font-mono text-sm overflow-x-auto max-w-full" v-html="highlightMatch(formula.expression, props.filter)"></div>
              </div>
            </div>
            <div class="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight :size="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-container {
  z-index: 40;
}

.formula-item {
  position: relative;
}

.formula-item:hover {
  background-color: rgba(168, 85, 247, 0.05);
}

.formula-item:hover::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #a855f7, #d946ef);
}

.formula-expression {
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.formula-expression::-webkit-scrollbar {
  height: 4px;
}

.formula-expression::-webkit-scrollbar-track {
  background: transparent;
}

.formula-expression::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}
</style>
