<script setup lang="ts">
import type { SavedQuoteModel } from '@/models/VueModel';

const model = defineModel<SavedQuoteModel[]>({ required: true });

const emit = defineEmits<{
  (e: 'view', quote: SavedQuoteModel): void;
}>();

function handleViewClick(quote: SavedQuoteModel) {
  emit('view', quote);
}

function handleDeleteClick(quote: SavedQuoteModel) {
  // TODO: Add confirmation dialog.
  model.value = model.value.filter(q => q.id !== quote.id);
}

</script>

<template>
  <div class="quote" v-for="(quote, index) in model" :key="quote.id">
    <div class="details">
      <h4>{{ quote.result.quoteName }}</h4>

      <label>Payment:</label>
      <currency-view :value="quote.result.payment" />

      <label>&nbsp; Out of Pocket:</label>
      <currency-view :value="quote.result.outOfPocket" />
    </div>

    <div class="buttons">
      <button type="button" @click="handleViewClick(quote)">View</button>
      <button type="button" class="danger" @click="handleDeleteClick(quote)">Delete</button>
    </div>

    <hr v-if="index < model.length - 1" />
  </div>


  <div class="empty" v-if="model.length === 0">
    <p>No saved quotes.</p>
  </div>
</template>

<style scoped>
.quote {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: space-between;

  padding: 0.75em 0.75em;

  > hr {
    grid-column: 1 / -1;
    margin-top: 0.75em;
  }
}

.quote .details {
  font-size: 0.8em;

  > h4 {
    font-size: 1.3em;
    font-weight: bolder;
  }
}

.buttons {
  padding: 0;
}

</style>
