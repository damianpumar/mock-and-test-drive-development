import { createApp } from 'vue'
import App from './App.vue'

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass' // Permite peticiones no mockeadas
  })
}

enableMocking().then(() => {
  createApp(App).mount('#app')
})
