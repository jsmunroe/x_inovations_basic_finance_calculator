<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  value: {
    type: String,
    default: '',
    required: true,
  },

  placeholder: {
    type: String,
    default: '',
    required: false,
  },
})

const emit = defineEmits<{
  input: [value: string]
}>()

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const numericValue = parseFloat(target.value.replace(/[^0-9.-]+/g, ''))
  emit('input', isNaN(numericValue) ? 0 : numericValue)
}

const value = computed(() => props.value)
</script>

<template>
  <input type="text" :placeholder="props.placeholder" :value="value" @input="handleInput" />
</template>

<style scoped></style>
