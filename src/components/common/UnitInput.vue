<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel<number>({ required: true })

const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
  places: {
    type: Number,
    default: undefined,
  },
})

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const numericValue = parseFloat(target.value.replace(/[^0-9.-]+/g, ''))
  model.value = isNaN(numericValue) ? 0 : numericValue
}

function formatNumber(value: number): string {
  if (!props.places) {
    return value.toString()
  }

  return value.toLocaleString('en-US', {
    minimumFractionDigits: props.places,
    maximumFractionDigits: props.places,
  })
}

const value = computed(() => formatNumber(model.value))
</script>

<template>
  <div class="currency-input-wrapper">
    <input type="text" placeholder="0.0" :value="value" @input="handleInput" />
    <span class="currency-symbol">{{ props.symbol }}</span>
  </div>
</template>

<style scoped>
.currency-input-wrapper {
  position: relative;
  display: inline-block;

  .currency-symbol {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #a1afc1;

    font-weight: bold;
  }
}

.currency-input-wrapper input {
  text-align: left;
}
</style>
