import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createPinia } from 'pinia';


// Create Vue app
createApp(App).use(createPinia()).use(router).mount('#app')

