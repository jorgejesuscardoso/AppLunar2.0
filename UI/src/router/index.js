import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import Home from '@/components/page/home/Home.vue';
import WarningNewFeature from '@/components/warnings/WarningNewFeature.vue';
import NotFound from '@/components/page/notFound/NotFound.vue';
import Login from '@/components/page/login/Login.vue';
import Register from '@/components/page/register/registerUser.vue';

const routes = [
  {
    path: '/',
    component: MainLayout, // Define o layout principal
    children: [
      { path: '', component: Home },
      { path: '/warning', component: WarningNewFeature },
      { path: '/:pathMatch(.*)*', component: NotFound },
    ],
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
