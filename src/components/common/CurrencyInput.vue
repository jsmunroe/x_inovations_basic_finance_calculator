<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel<number>({ required: true })

function handleInput(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  const numericValue = parseFloat(target.value.replace(/[^0-9.-]+/g, ''))
  model.value = isNaN(numericValue) ? 0 : numericValue
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formattedValue = computed(() => formatCurrency(model.value))
</script>

<template>
  <div class="currency-input-wrapper">
    <span class="currency-symbol">$</span>
    <input type="text" placeholder="0.0" :value="formattedValue" @blur="handleInput" />
  </div>
</template>

<style scoped>
.currency-input-wrapper {
  position: relative;
  display: inline-block;

  .currency-symbol {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #a1afc1;

    font-weight: bold;
  }
}

.currency-input-wrapper input {
  text-align: right;
}
</style>
