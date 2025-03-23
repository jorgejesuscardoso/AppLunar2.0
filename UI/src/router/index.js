import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import Home from '@/components/page/home/Home.vue';
import WarningNewFeature from '@/components/warnings/WarningNewFeature.vue';

const routes = [
  {
    path: '/',
    component: MainLayout, // Define o layout principal
    children: [
      { path: '', component: Home },
      { path: '/warn', component: WarningNewFeature },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
