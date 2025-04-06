<script setup lang="ts">
import { GetUserByUserWtpApi, UpdateUserApi } from '@/API/usersApi'
import { ref, reactive, computed, watch, onMounted, inject } from 'vue'
import IconsLucide from '@/helpers/IconsLucide.vue'

const theme = inject('isDarkMode')

const isDarkMode = ref(theme)
const isLoggedIn = ref(false)
const isLoading = ref(false)
const isEditingBook = ref(false)

const profile = reactive({
    id: '',
    name: '',
    user: '',
    age: 0,
    userWtp: '',
    phone: '',
    books: [{
        id:'',
        title: '',
        wUrl: '',
        cover: '',
        status: '',
        genre: '',
        subGenre: '',
    }],
})

const handleGetUserByUserWtpApi = async () => {

    const wtp = localStorage.getItem('user')
    const user = JSON.parse(wtp as string)

    const data = await GetUserByUserWtpApi(user.userWtp)
    if (data) {
        profile.id = data.id
        profile.name = data.name
        profile.user = data.user
        profile.age = data.age
        profile.userWtp = data.userWtp
        profile.phone = data.phone
        profile.books = data.books

        return
    } else {
        return { message: 'Nenhum dado encontrado' }
    }    
}

const handleGetIsLoggedIn = () => {
    const wtp = localStorage.getItem('user')
    const parseWtp = JSON.parse(wtp as string)
    if (parseWtp.userWtp) {
        isLoggedIn.value = true
    } else {
        isLoggedIn.value = false
        window.location.href = '/login'
    }
}

watch(profile, (newValue) => {
    console.log(isDarkMode.value)
}, { deep: true })

const salvar = async () => {
  try {
    isLoading.value = true
    // Aqui você faz a chamada para o backend para salvar as alterações
    await UpdateUserApi(profile.userWtp, profile)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.error(error)
  }
}


onMounted(() => {
    isLoading.value = true
    handleGetUserByUserWtpApi()
    handleGetIsLoggedIn()
    isLoading.value = false
})

</script>

<template>
    <div class="flex flex-col items-center justify-start h-screen bg-gray-100 mb-24">
      <main
        class="flex flex-col items-center justify-start w-full max-w-2xl p-6 bg-white shadow-md rounded-lg mt-14"
      >
        <h1 class="text-base font-bold text-gray-800 mb-6">Editar Perfil</h1>
  
        <form @submit.prevent="salvar" class="w-full space-y-4">
          <!-- Nome -->
          <div>
            <label class="block text-xs font-medium text-gray-700">Nome</label>
            <input
              v-model="profile.name"
              type="text"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
  
          <!-- Usuário -->
          <div>
            <label class="block text-xs font-medium text-gray-700">Usuário</label>
            <input
              v-model="profile.user"
              type="text"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs text-sm"
            />
          </div>
  
          <!-- Idade -->
          <div>
            <label class="block text-xs font-medium text-gray-700">Idade</label>
            <input
              v-model="profile.age"
              type="number"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs text-sm"
            />
          </div>
  
          <!-- Telefone -->
          <div>
            <label class="block text-xs font-medium text-gray-700">Telefone</label>
            <div>
                <
            </div>
            <input
              v-model="profile.phone"
              type="tel"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs text-sm"
            />
          </div>

          <!-- Livros (lista apenas para visualização rápida) -->
          <div
            v-if="!isEditingBook"
          >
            <label class="flex justify-between block text-xs font-medium text-gray-700 mb-1 w-full">
                Livros 
                <button
                    type="button"
                    @click="isEditingBook = !isEditingBook"
                    class="text-xs text-indigo-600 hover:underline ml-2"
                    v-if="profile.books.length > 0"
                >
                    Editar
                </button>
            </label>
            <ul class="space-y-2">
              <li
                v-for="(book, index) in profile.books"
                :key="book.id"
                class="p-2 border rounded bg-gray-50 "
              >
                <p class="font-semibold text-gray-800 text-sm">{{ book.title }}</p>
                <p class="text-xs text-gray-600">Gênero: {{ book.genre }} | Status: {{ book.status }}</p>
              </li>
            </ul>
          </div>
  
          <!-- Livros (editáveis) -->
        <div
          v-if="isEditingBook"
        >
            <label class="flex justify-between w-full block text-xs font-medium text-gray-700 mb-1">
                <span
                    class="flex items-center"
                >
                    <IconsLucide 
                        name="BookOpen" 
                        class="w-4 h-4 mr-2 text-gray-500"

                    />
                    Livros
                </span>
                <button
                    type="button"
                    @click="isEditingBook = !isEditingBook"
                    class="text-xs text-indigo-600 hover:underline ml-2"
                    v-if="profile.books.length > 0"
                >
                    Fechar
                </button>
            </label>

            <ul class="space-y-4">
                <li
                v-for="(book, index) in profile.books"
                :key="index"
                class="p-4 border rounded bg-gray-50 space-y-2 relative"
                >
                <!-- Título -->
                <div>
                    <label class="block text-xs font-medium text-gray-700">Título</label>
                    <input
                    v-model="book.title"
                    type="text"
                    placeholder="Digite o título"
                    class="w-full px-2 py-1 border rounded"
                    />
                </div>

                <!-- URL da Capa -->
                <div>
                    <label class="block text-xs font-medium text-gray-700">URL da Capa</label>
                    <input
                    v-model="book.cover"
                    type="text"
                    placeholder="https://..."
                    class="w-full px-2 py-1 border rounded"
                    />
                </div>

                <!-- Gênero -->
                <div>
                    <label class="block text-xs font-medium text-gray-700">Gênero</label>
                    <input
                    v-model="book.genre"
                    type="text"
                    placeholder="Fantasia, Romance..."
                    class="w-full px-2 py-1 border rounded"
                    />
                </div>

                <!-- Subgênero -->
                <div>
                    <label class="block text-xs font-medium text-gray-700">Subgênero</label>
                    <input
                    v-model="book.subGenre"
                    type="text"
                    class="w-full px-2 py-1 border rounded"
                    />
                </div>

                <!-- Status -->
                <div>
                    <label class="block text-xs font-medium text-gray-700">Status</label>
                    <input
                        v-model="book.status"
                        type="text"
                        placeholder="Lido, Lendo, Desejo ler..."
                        class="w-full px-2 py-1 border rounded"
                    />
                </div>

                <!-- Botão Remover -->
                <button
                    type="button"
                    @click="removerLivro(index)"
                    class="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                >
                    Remover
                </button>
                </li>
            </ul>

        </div>
  
          <!-- Botão de salvar -->
        <div 
            class="flex justify-center pt-4"
        >
            <button
              type="submit"
              class="flex items-center justify-center px-3 py-1 bg-indigo-600 text-white text-sm rounded-md shadow hover:bg-indigo-700 transition"
            >
            <IconsLucide 
                name="Save" 
                class="w-4 h-4 mr-2 text-white"
            />
              Salvar
            </button>
          </div>
        </form>
      </main>
    </div>
  </template>
  