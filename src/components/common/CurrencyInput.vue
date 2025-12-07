<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel<number>({ required: true })

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
})

function handleBlur(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  let numericValue = parseFloat(target.value.replace(/[^0-9.-]+/g, ''))
  numericValue = isNaN(numericValue) ? 0 : numericValue
  target.value = formatCurrency(numericValue)
  model.value = numericValue
}

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  target.select()
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
    <input type="text" :id="props.id" :name="props.name" placeholder="0.0" :value="formattedValue" @focus="handleFocus" @blur="handleBlur" />
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
