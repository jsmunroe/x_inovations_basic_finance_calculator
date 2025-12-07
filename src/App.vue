<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'
import { computeResult, createVueModel, loadVueModel, saveQuote, saveVueModel, deleteQuote, type SavedQuoteModel } from './models/VueModel'
import FinanceQuoteSection from './components/FinanceQuoteSection.vue'
import ResultSection from './components/ResultSection.vue'
import SavedQuotes from './components/SavedQuotes.vue'

const vueModel = reactive(createVueModel())

// Load data on component mount
onMounted(async () => {
  try {
    const loadedModel = await loadVueModel()
    Object.assign(vueModel, loadedModel)
  } catch (error) {
    console.error('Failed to load Vue model:', error)
  }
})

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

async function handleSaveClick() {
  if (!vueModel.result.quoteName) {
    // This should be done a much better way, but for now....
    const quoteName = document.querySelector('#quoteName') as HTMLInputElement;
    quoteName.setCustomValidity('Please enter a quote name before saving.');
    quoteName.reportValidity();
    return;
  }

  try {
    await saveQuote(vueModel, vueModel.result.quoteName);

    const newVueModel = createVueModel();
    vueModel.financeQuote = newVueModel.financeQuote;
    vueModel.result = newVueModel.result;
    vueModel.id = newVueModel.id;
  } catch (error) {
    console.error('Failed to save quote:', error);
  }
}

function handleView(quote: SavedQuoteModel) {
  vueModel.financeQuote = quote.financeQuote;
  vueModel.result = quote.result;
  vueModel.id = quote.id;
}

async function handleDelete(quote: SavedQuoteModel) {
  try {
    await deleteQuote(vueModel, quote.id);
  } catch (error) {
    console.error('Failed to delete quote:', error);
  }
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
      <SavedQuotes v-model="vueModel.savedQuotes" @view="handleView" @delete="handleDelete" />
    </app-section>
  </main>
</template>

<style scoped></style>
