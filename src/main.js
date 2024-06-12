import { createApp, onMounted } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
import 'bootstrap/dist/css/bootstrap.css'

import { createPinia } from 'pinia'
import router from './router/index'


const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
