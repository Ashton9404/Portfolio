import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'

// Fonts are self-hosted through Fontsource rather than loaded from Google Fonts:
// one less third-party request, no render-blocking round trip, and it keeps
// working in regions where Google Fonts is slow or blocked.
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'

import App from './App.vue'
import { i18n, syncDocumentLocale } from './i18n'
import { router } from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createHead())
app.use(i18n)
app.use(router)

// index.html ships lang="en"; correct it immediately if the visitor chose 中文.
syncDocumentLocale()

app.mount('#app')
