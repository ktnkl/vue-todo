import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

import Aura from '@primeuix/themes/aura';

import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n';
import ru from '@/locales/ru';
import en from '@/locales/en';

import { DatePicker, FloatLabel } from 'primevue'

const i18n = createI18n({
  legacy: false, // для Composition API
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    ru,
    en
  }
});

const app = createApp(App)

app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.component('PrimeDialog',Dialog)
app.component('PrimeButton', Button)
app.component('InputText', InputText)
app.component('FloatLabel', FloatLabel)
app.component('DatePicker', DatePicker)

app.mount('#app')
