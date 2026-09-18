import { createPinia } from 'pinia'
import type { App } from 'vue'
import { router } from './router'

export function withProviders(app: App): App {
  return app.use(createPinia()).use(router)
}

export { router }
