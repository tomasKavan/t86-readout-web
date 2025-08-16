import { createApp, h } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, Button, Card, Checkbox, Column, ConfirmDialog, DataTable, DatePicker, Dialog, InputNumber, InputText, MultiSelect, Panel, Select, SelectButton, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, Toast, ToggleSwitch, Toolbar, Tooltip } from 'primevue'
import Chart from 'primevue/chart'
import StyleClass from 'primevue/styleclass'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import { router } from './router'
import App from './App.vue'

import './style.css'
import 'primeicons/primeicons.css'

import { ApolloClients } from '@vue/apollo-composable';
import { apolloClient } from './apolloSession';

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

app.provide(ApolloClients, {
 default: apolloClient,
});

app.use(ConfirmationService)
app.use(ToastService)

app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('ConfirmDialog', ConfirmDialog)
app.component('SelectButton', SelectButton)
app.component('Chart', Chart)
app.component('MultiSelect', MultiSelect)
app.component('DatePicker', DatePicker)
app.component('Panel', Panel)
app.component('ToggleSwitch', ToggleSwitch)
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
app.component('Checkbox', Checkbox)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionContent', AccordionContent)

app.directive('styleclass', StyleClass)
app.directive('tooltip', Tooltip)

app.mount('#app')