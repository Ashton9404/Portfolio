import { createApp } from 'vue'

// Fonts are self-hosted through Fontsource rather than loaded from Google Fonts:
// one less third-party request, no render-blocking round trip, and it keeps
// working in regions where Google Fonts is slow or blocked.
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'

import App from './App.vue'
import './assets/main.css'

createApp(App).mount('#app')
