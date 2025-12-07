import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { CurrencyInput, CurrencyView, TextInput, AppSection, UnitInput } from './components/common'

const app = createApp(App)
app.component('app-section', AppSection)
app.component('text-input', TextInput)
app.component('currency-input', CurrencyInput)
app.component('currency-view', CurrencyView)
app.component('unit-input', UnitInput)

app.mount('#app')
