import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import Home from '@/pages/home/Home.vue';
import WarningNewFeature from '@/components/warnings/WarningNewFeature.vue';
import NotFound from '@/pages/notFound/NotFound.vue';
import Login from '@/pages/login/Login.vue';
import Register from '@/pages/register/registerUser.vue';
import Dashboard from '@/components/dashboard/dashboard.vue';
import Profile from '@/pages/profile/Profile.vue';
import EditProfile from '@/pages/profile/Edit.vue';

const routes = [
  {
    path: '/',
    component: MainLayout, // Define o layout principal
    children: [
      { path: '', component: Home },
      { path: '/dashboard', component: Dashboard },
      { path: '/warning', component: WarningNewFeature },
      { path: '/:pathMatch(.*)*', component: NotFound },
      { path: '/profile', component: Profile },
      { path: '/profile/edit/:id', component: EditProfile },
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
