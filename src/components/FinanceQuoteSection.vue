<script setup lang="ts">
import type { FinanceQuoteModel } from '@/models/VueModel'

const financeQuote = defineModel<FinanceQuoteModel>({ required: true })
</script>

<template>
  <app-section title="Finance Quote">
    <div class="grid">
      <label>Cost:</label>
      <currency-input v-model.lazy="financeQuote.cost" />

      <label>Profit:</label>
      <currency-input v-model.lazy="financeQuote.profit" />

      <label>Selling Price:</label>
      <currency-input v-model.lazy="financeQuote.sellingPrice" />

      <label>Term:</label>
      <unit-input v-model.lazy="financeQuote.term" symbol="Months" :places="0" />

      <label>Rate:</label>
      <unit-input v-model.lazy="financeQuote.rate" symbol="%" :places="1" />

      <label>Out Of Pocket:</label>
      <currency-input v-model.lazy="financeQuote.outOfPocket" />

      <label>TaxRate:</label>
      <unit-input v-model.lazy="financeQuote.taxRate" symbol="%" :places="1" />
    </div>
  </app-section>
</template>
