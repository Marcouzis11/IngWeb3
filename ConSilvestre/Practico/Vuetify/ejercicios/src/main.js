// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'unfonts.css'

// Si tu plugins ya hace app.use(router) y app.use(vuetify)
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)   // ⚠️ acá adentro se instala el router

app.mount('#app')
