import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueClickAway from "vue3-click-away";

import "@heroicons/vue"
import "./style.css"
const app = createApp(App)

app.use(createPinia())
app.use(VueClickAway)
app.use(router)

app.mount('#app')
