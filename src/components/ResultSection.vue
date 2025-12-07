<script setup lang="ts">
import type { ResultModel } from '@/models/VueModel'

const result = defineModel<ResultModel>({ required: true })
</script>

<template>
  <div class="grid">
    <label>Taxes:</label>
    <currency-view :value="result.taxes" />

    <label>Base Loan Amount:</label>
    <currency-view :value="result.baseLoanAmount" />

    <label>Interest:</label>
    <currency-view :value="result.interest" />

    <label>Total Loan Amount:</label>
    <currency-view :value="result.totalLoanAmount" />

    <label><strong>Payment:</strong></label>
    <currency-view :value="result.payment" />

    <label>Out Of Pocket:</label>
    <currency-view :value="result.outOfPocket" />

    <label>Quote Name:</label>
    <text-input id="quoteName" name="quoteName" v-model="result.quoteName" />
  </div>
</template>
