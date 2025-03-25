import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'


const app = createApp(App); // Cria a instância do Vue

app.component('QuillEditor', QuillEditor)  // Usa o Quill Editor corretamente

app.use(router);            // Usa o Vue Router corretamente
app.mount('#app');          // Monta a aplicação no DOM
