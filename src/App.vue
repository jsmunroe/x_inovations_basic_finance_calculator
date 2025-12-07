<script setup lang="ts"></script>

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
        <div class="grid">
          <label>Cost:</label>
          <currency-input :value="0" />

          <label>Profit:</label>
          <currency-input :value="0" />

          <label>Selling Price:</label>
          <currency-input :value="0" />

          <label>Term:</label>
          <unit-input :value="0" symbol="Months" :places="0" />

          <label>Rate:</label>
          <unit-input :value="0" symbol="%" :places="1" />

          <label>Out Of Pocket:</label>
          <currency-input :value="0" />

          <label>TaxRate:</label>
          <unit-input :value="0" symbol="%" :places="1" />
        </div>
      </app-section>

      <app-section title="Result">
        <div class="grid">
          <label>Taxes:</label>
          <currency-view :value="0" />

          <label>Base Loan Amount:</label>
          <currency-view :value="0" />

          <label>Interest:</label>
          <currency-view :value="0" />

          <label>Total Loan Amount:</label>
          <currency-view :value="0" />

          <label><strong>Payment:</strong></label>
          <currency-view :value="0" />

          <label>Out Of Pocket:</label>
          <currency-view :value="0" />

          <label>Quote Name:</label>
          <text-input value="" />
        </div>
      </app-section>
    </div>

    <app-section title="Saved Quotes" class="span-2"> </app-section>
  </main>
</template>

<style scoped></style>
