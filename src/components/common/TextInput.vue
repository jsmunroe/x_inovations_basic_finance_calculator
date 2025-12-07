<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel<string>({ required: true })

const props = defineProps({
  id: {
    type: String,
    default: '',
    required: false,
  },
  name: {
    type: String,
    default: '',
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
    required: false,
  },
})

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  target.select()
}

function handleBlur(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  model.value = target.value;
}

const value = computed(() => model.value)
</script>

<template>
  <input type="text" :id="props.id" :name="props.name" :placeholder="props.placeholder" :value="value" @focus="handleFocus" @blur="handleBlur" />
</template>

<style scoped></style>
