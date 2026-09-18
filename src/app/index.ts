import { createApp } from 'vue'
import App from './App.vue'
import { withProviders } from './providers'

export function createBookCatalogApp() {
  return withProviders(createApp(App))
}
