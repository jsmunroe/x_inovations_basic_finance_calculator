<script setup lang="ts">
import { updateFinanceQuoteByCost, updateFinanceQuoteByProfit, updateFinanceQuoteBySellingPrice, type FinanceQuoteModel } from '@/models/VueModel'
import { watch } from 'vue'

const financeQuote = defineModel<FinanceQuoteModel>({ required: true })

watch(
  () => financeQuote.value.cost,
  (newCost) => { financeQuote.value = updateFinanceQuoteByCost(financeQuote.value, newCost) },
)

watch(
  () => financeQuote.value.profit,
  (newProfit) => { financeQuote.value = updateFinanceQuoteByProfit(financeQuote.value, newProfit) },
)

watch(
  () => financeQuote.value.sellingPrice,
  (newSellingPrice) => { financeQuote.value = updateFinanceQuoteBySellingPrice(financeQuote.value, newSellingPrice) },
)
</script>

<template>
  <div class="grid">
    <label>Cost:</label>
    <currency-input id="cost" name="cost" v-model.lazy="financeQuote.cost" />

    <label>Profit:</label>
    <currency-input id="profit" name="profit" v-model.lazy="financeQuote.profit" />

    <label>Selling Price:</label>
    <currency-input id="sellingPrice" name="sellingPrice" v-model.lazy="financeQuote.sellingPrice" />

    <label>Term:</label>
    <unit-input id="term" name="term" v-model.lazy="financeQuote.term" symbol="Months" :places="0" />

    <label>Rate:</label>
    <unit-input id="rate" name="rate" v-model.lazy="financeQuote.rate" symbol="%" :places="1" />

    <label>Out Of Pocket:</label>
    <currency-input id="outOfPocket" name="outOfPocket" v-model.lazy="financeQuote.outOfPocket" />

    <label>TaxRate:</label>
    <unit-input id="taxRate" name="taxRate" v-model.lazy="financeQuote.taxRate" symbol="%" :places="1" />
  </div>
</template>
