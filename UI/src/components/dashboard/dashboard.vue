<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { GetUserApi } from '@/API/usersApi';

const isAdmin = inject('isAdmin');
const isDarkMode = inject('isDarkMode');

const users = ref([]);

onMounted(async () => {
    const fetchUsers = await GetUserApi()
    console.log('Users:', fetchUsers);

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

            poinst: user.poinst,
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
    <div class="flex h-screen bg-gray-100">
      <main class="flex-1 p-6">
        <h1 class="text-2xl font-bold text-gray-900">Controle Lunar</h1>
  
        <div class="bg-white p-4 shadow rounded-lg mt-4">
          <h3 class="text-lg font-semibold mb-2">Lista de Membros Lunar</h3>
          <table class="w-full border">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-2">Nome</th>
                <th class="p-2">Cargo</th>
                <th class="p-2">Idade</th>
                <th class="p-2">Telefone</th>
                <th class="p-2">WattPad</th>
                <th class="p-2">Livros</th>
                <th class="p-2">SubGrupo</th>
                <th class="p-2">Pontos</th>
                <th class="p-2">Status</th>
                <th class="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
            <tr 
                v-for="user in users" 
                :key="user.id" 
                class="border-t"
            >
                  <td class="p-2">{{ user.name }}</td>
                  <td class="p-2">{{ user.role }}</td>
                  <td class="p-2">{{ user.age }}</td>
                    <td class="p-2">{{ user.phone }}</td>
                  <td class="p-2">{{ user.userWtp }}</td>

                  <td class="p-2">
                      <div
                          class="flex items-center space-x-2"
                          v-for="book in user.books"
                          :key="book.id"
                      >
                          <span class="text-gray-700">{{ book.title }}</span>
                          <img 
                              :src="book.cover"
                              class="w-10 h-10"
                              :alt="`Book cover for ${book.title}`"
                          >
                      </div>
                  </td>

                  <td class="p-2">
                      <span v-for="sub in user.subs" :key="sub.id" class="text-green-500">
                          {{ sub.name }}
                      </span>
                  </td>

                  <td class="p-2">{{ user.poinst }}</td>
                    <td class="p-2">
                        <span :class="user.status === 'active' ? 'text-green-500' : 'text-red-500'">
                            {{ user.status }}
                        </span>
                    </td>

                <td class="p-2">
                  <button class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button class="bg-red-500 text-white px-2 py-1 rounded ml-2">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </template>