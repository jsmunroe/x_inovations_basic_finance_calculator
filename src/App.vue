<script setup lang="ts">
import { reactive, watch } from 'vue'
import { createVueModel } from './models/VueModel'
import FinanceQuoteSection from './components/FinanceQuoteSection.vue'
import ResultSection from './components/ResultSection.vue'

const vueModel = reactive(createVueModel())

watch(
  () => vueModel.financeQuote,
  (newVal) => {
    vueModel.result.outOfPocket = newVal.outOfPocket
  },
  { deep: true },
)
</script>

<template>
  <header>
    <div class="logo-container">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="45" height="45" />
      <span>DeskPro</span>
    </div>
  </header>

  <main>
    <div class="layout">
      <FinanceQuoteSection v-model="vueModel.financeQuote" />

      <ResultSection v-model="vueModel.result" />
    </div>

    <app-section title="Saved Quotes" class="span-2"> </app-section>
  </main>
</template>

<style scoped></style>
