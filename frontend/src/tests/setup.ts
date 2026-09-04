import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

config.global.plugins = [
  createPinia(),
  [PrimeVue, { theme: { preset: Aura } }]
]
