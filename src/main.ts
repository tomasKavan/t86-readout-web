import { createApp, h } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import { Button, Card, Column, DataTable, InputNumber, InputText, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, Toolbar } from 'primevue'
import StyleClass from 'primevue/styleclass'

import { router } from './router'
import App from './App.vue'

import './style.css'
import 'primeicons/primeicons.css'

//import { ApolloClients } from '@vue/apollo-composable';
//import { apolloClient } from './apollo/client';

const app = createApp({
  setup: () => () => h(App),
})

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  },
  ripple: true
})

//app.provide(ApolloClients, {
//  default: apolloClient,
//});

app.component('Tabs', Tabs)
app.component('TabList', TabList)
app.component('Tab', Tab)
app.component('TabPanels', TabPanels)
app.component('TabPanel', TabPanel)
app.component('Textarea', Textarea)
app.component('Select', Select)
app.component('InputText', InputText)
app.component('Card', Card)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Toolbar', Toolbar)
app.component('InputNumber', InputNumber)

app.directive('styleclass', StyleClass)

app.mount('#app')