<script setup lang="ts">
import { reactive, watch } from 'vue'
import { computeResult, createVueModel, loadVueModel, saveQuote, saveVueModel, type SavedQuoteModel } from './models/VueModel'
import FinanceQuoteSection from './components/FinanceQuoteSection.vue'
import ResultSection from './components/ResultSection.vue'
import SavedQuotes from './components/common/SavedQuotes.vue'

const vueModel = reactive(loadVueModel())

watch(
  () => vueModel.financeQuote,
  (newVal) => {
    const { quoteName } = vueModel.result

    vueModel.result = {
      ...computeResult(newVal),
      quoteName,
    }
  },
  { deep: true },
)

watch(
  () => vueModel,
  (newVal) => {
    saveVueModel(newVal);
  },
  { deep: true },
)

function handleSaveClick() {
  if (!vueModel.result.quoteName) {
    // This should be done a much better way, but for now....
    const quoteName = document.querySelector('#quoteName') as HTMLInputElement;
    quoteName.setCustomValidity('Please enter a quote name before saving.');
    quoteName.reportValidity();
    return;
  }

  saveQuote(vueModel, vueModel.result.quoteName);

  const newVueModel = createVueModel();
  vueModel.financeQuote = newVueModel.financeQuote;
  vueModel.result = newVueModel.result;
  vueModel.id = newVueModel.id;
}

function handleView(quote: SavedQuoteModel) {
  vueModel.financeQuote = quote.financeQuote;
  vueModel.result = quote.result;
  vueModel.id = quote.id;
}

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
      <app-section title="Finance Quote">
        <FinanceQuoteSection v-model="vueModel.financeQuote" />
      </app-section>

      <app-section title="Result">
        <ResultSection v-model="vueModel.result" />

        <div class="buttons">
          <button type="submit" class="icon" @click="handleSaveClick"><i class="fa-regular fa-floppy-disk fa-lg"></i> Save</button>
        </div>
      </app-section>
    </div>

    <app-section title="Saved Quotes" class="span-2">
      <SavedQuotes v-model="vueModel.savedQuotes" @view="handleView" />
    </app-section>
  </main>
</template>

<style scoped></style>
