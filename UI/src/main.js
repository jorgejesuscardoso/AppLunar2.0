import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient()


const app = createApp(App); // Cria a instância do Vue

app.component('QuillEditor', QuillEditor)  // Usa o Quill Editor corretamente

app.use(router);            // Usa o Vue Router corretamente
app.use(VueQueryPlugin, { queryClient }) // Usa o Vue Query corretamente
app.mount('#app');          // Monta a aplicação no DOM
