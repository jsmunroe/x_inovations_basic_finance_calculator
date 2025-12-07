<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

function formatCurrency(value: number): string {
  return (
    '$' +
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

const value = computed(() => formatCurrency(props.value))
</script>

<template>
  <div class="currency-view-wrapper">
    <span>{{ value }}</span>
  </div>
</template>

<style scoped>
.currency-view-wrapper {
  padding: 0.3rem 0.5rem;
  text-align: right;
}
</style>
