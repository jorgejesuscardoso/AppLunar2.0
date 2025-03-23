import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App); // Cria a instância do Vue
app.use(router);            // Usa o Vue Router corretamente
app.mount('#app');          // Monta a aplicação no DOM
