<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue';
import { GetUserApi } from '@/API/usersApi';
import Carduser from '../cards/carduser.vue';

const themeInject = inject('isDarkMode') as any;

const isAdmin = ref(false);

const users = ref([]);
const erroMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const isLogged = ref(false);
const isDarkMode = ref(themeInject);

const handleIsLogged = () => {
    const getUser = localStorage.getItem('user')
    const user = JSON.parse(getUser);

    if (user && user.role === 'admin' || user.subRole === 'adminTrainee') {
        isAdmin.value = true;
        isLogged.value = true;
    } else {
        isLogged.value = false;
        erroMessage.value = 'Você não está logado!';
        window.location.href = '/';
    }
}

const handleGetTheme = () => {
    const getTheme = localStorage.getItem('theme')
    if (getTheme === 'dark') {
        isDarkMode.value = true;
    } else {
        isDarkMode.value = false;
    }
}

onMounted(async () => {
    handleIsLogged();
    handleGetTheme();
    const fetchUsers = await GetUserApi()

    if (fetchUsers) {
      users.value = fetchUsers.map((user: any) => ({
          id: user.userWtp,
          user: user.user,
          userWtp: user.userWtp,
          status: user.status,
          isDeleted: user.isDeleted,

          name: user.name,
          age: user.age,
          phone: user.phone,

          role: user.role,
          subRole: user.subRole,

          points: user.points,
          books: user.books,
          subs: user.subs,

          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          createdBy: user.createdBy,
      }));
    }
});

</script>

<template>
    <div 
      class="w-screen flex flex-col min-h-screen w-screen py-6"
      :class="{ 'bg-[#0f1218]': isDarkMode }"
      >
        
      <main 
        class="flex w-full gap-2 flex-wrap grid grid-cols-1 md:grid-cols 3 py-2 px-9 pb-7 mt-10"
      >
        <h3
          class="font-bold text-gray-800 w-full text-start text-xs mt-0"
          :class="{ 'text-white': isDarkMode }"
       >
          Total de Usuários: {{ users.length }}
        </h3>
        <Carduser
          v-for="user in users"
          :key="user.id"
          :user="user"
          :isAdmin="isAdmin"
          :isDarkMode="isDarkMode"
          :isLogged="isLogged"
        />
      </main>
    </div>
  </template>