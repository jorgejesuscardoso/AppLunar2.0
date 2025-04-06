<script setup lang="ts">
import { GetUserByUserWtpApi, UpdateUserApi } from '@/API/usersApi'
import { ref, reactive, computed, watch, onMounted, inject } from 'vue'
import IconsLucide from '@/helpers/IconsLucide.vue'
import { useForm, useField, useFieldError } from 'vee-validate'
import * as yup from 'yup'
import { useMutation } from '@tanstack/vue-query'

const theme = inject('isDarkMode')

const isDarkMode = ref(theme)
const isLoggedIn = ref(false)
const isLoading = ref(false)
const isLoadingCreatingBook = ref(false)
const isEditingBook = ref(false)
const isCreatingBook = ref(false)


const bookSchema = yup.object({
  title: yup.string().required('O título é obrigatório'),
  wUrl: yup.string().url('URL inválida').required('A URL é obrigatória'),
  cover: yup.string().url('URL da capa inválida').nullable(),
  status: yup.string().required('O status é obrigatório'),
  genre: yup.string().required('O gênero é obrigatório'),
  subGenre: yup.string().nullable(),
})

const { handleSubmit, errors } = useForm({
  validationSchema: bookSchema
})

const { value: title } = useField<string>('title')
const { value: wUrl } = useField<string>('wUrl')
const { value: cover } = useField<string>('cover')
const { value: status } = useField<string>('status')
const { value: genre } = useField<string>('genre')
const { value: subGenre } = useField<string>('subGenre')

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoadingCreatingBook.value = true

    profile.books.push({ ...values })

    await UpdateUserApi(profile.userWtp, profile)

    isCreatingBook.value = false
    isLoadingCreatingBook.value = false
  } catch (err) {
    console.error(err)
    isLoadingCreatingBook.value = false
  }
})






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

    if (!wtp || !parseWtp.userWtp) {
        window.location.href = '/'
        isLoggedIn.value = false
    } else {
        isLoggedIn.value = true
    }
}


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

const removerLivro = async (index: number) => {
    profile.books.splice(index, 1)

    try {
        isLoading.value = true
        await UpdateUserApi(profile.userWtp, profile)
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
        console.error(error)
    }
 
}


onMounted(() => {
    isLoading.value = true
    handleGetIsLoggedIn()
    if (isLoggedIn.value) {
        handleGetUserByUserWtpApi()
        isLoading.value = false
    } else {
        window.location.href = '/'
    }
})

</script>

<template>
    <div class="flex flex-col items-center justify-start h-screen bg-gray-100 mb-60">
      <main
        class="flex flex-col items-center justify-start w-full max-w-2xl p-6 bg-white shadow-md rounded-lg mt-14"
      >
        <div
            class="flex items-center justify-center w-ful relative mb-6"
        >
            <h1 class="text-base font-bold text-gray-800">
                Editar Perfil
            </h1>

            <button
                type="button"
                @click="$router.push('/home')"
                class="absolute flex items-center justify-center px-3 py-1  text-blue-800 font-semibold text-sm top-0 right-36"
            >
                <IconsLucide 
                    name="ArrowLeft" 
                    class="w-4 h-4 mr-2"
                    color="blue"
                />
                Voltar
            </button>
        </div>
  
        <form @submit.prevent="salvar" class="w-full space-y-4">
          <!-- Nome -->
          <div>
            <label 
                class="flex block text-xs font-medium text-gray-700"
            >
                <IconsLucide 
                    name="IdCard" 
                    class="w-4 h-4 mr-2 text-gray-500"
                />
                Nome:
            </label>
            <input
              v-model="profile.name"
              type="text"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
  
          <!-- Usuário -->
          <div>
            <label 
                class="flex block text-xs font-medium text-gray-700"
            >
                <IconsLucide 
                    name="User" 
                    class="w-4 h-4 mr-2 text-gray-500"
                />
                Usuário
            </label>
            <input
              v-model="profile.user"
              type="text"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs text-sm"
            />
          </div>
  
          <!-- Idade -->
          <div>
            <label 
                class="flex block text-xs font-medium text-gray-700"
            >
                <IconsLucide 
                    name="Calendar" 
                    class="w-4 h-4 mr-2 text-gray-500"
                />
                Idade
            </label>
            <input
              v-model="profile.age"
              type="number"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-xs text-sm"
            />
          </div>
  
          <!-- Telefone -->
          <div>
            <label 
                class="flex block text-xs font-medium text-gray-700"
            >
                <IconsLucide 
                    name="Phone" 
                    class="w-4 h-4 mr-2 text-gray-500"
                />
                Telefone
            </label>
            <div>
                
                <span
                    class="text-[10px] text-gray-500 ml-1"
                >
                    Obs: Adicione o código do país e DDD. Ex: +55 11 9 0000-0000
                </span>
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
            <label 
                class="flex justify-between block text-xs font-medium text-gray-700 mb-1 w-full"
            >
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
                    @click="isCreatingBook = !isCreatingBook"
                    class="flex text-xs text-indigo-600 hover:underline ml-2 rounded-full border border-green-700 "
                >
                    <IconsLucide 
                        name="Plus" 
                        class="w-4 h-4 text-green-800"
                    />       
                                 
                </button>
                <button
                    v-if="profile.books.length > 0"
                    type="button"
                    @click="isEditingBook = !isEditingBook"
                    class="flex text-xs text-indigo-600 hover:underline ml-2"
                >
                    <IconsLucide 
                        name="Edit3" 
                        class="w-4 h-4 text-gray-500 mr-1"
                    />
                    Editar
                </button>
            </label>
            <ul 
                v-if="profile.books.length > 0"
                class="space-y-2"
            >
              <li
                v-for="(book, index) in profile.books"
                :key="book.id"
                class="flex items-center justify-between p-2 border rounded bg-gray-50 "
              >
                <div>
                    <p class="font-semibold text-gray-800 text-sm">{{ book.title }}</p>
                    <p class="text-xs text-gray-600">Gênero: {{ book.genre }} | Status: {{ book.status }}</p>
                </div>
                <div>
                    <img
                        v-if="book.cover"
                        :src="book.cover"
                        alt="Capa do livro"
                        class="w-7 h-10 mt-2"
                    />
                </div>
              </li>
            </ul>
            <!-- Quando nao houver livros cadastrados -->
            <div
                v-else
                class="flex flex-col items-center justify-center w-full h-32 border rounded bg-gray-50 text-gray-500 text-sm"
            >
                <div
                    class="flex items-center justify-center"
                >
                    <IconsLucide 
                        name="BookOpen" 
                        class="w-8 h-8 mr-2 text-gray-500"
                    />
                    Nenhum livro adicionado ainda.
                </div>
                <button
                    type="button"
                    @click="isCreatingBook = !isCreatingBook"
                    class="flex items-center justify-center px-3 py-1 bg-indigo-600 text-white text-sm rounded-md shadow hover:bg-indigo-700 transition mt-2"
                    :disabled="isLoading"
                >
                    <IconsLucide 
                        name="Plus" 
                        class="w-4 h-4 text-white"
                    /> 
                    Adicionar Livro
                </button>
            </div>
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
                    @click="isCreatingBook = !isCreatingBook"
                    class="flex text-xs text-indigo-600 hover:underline ml-2 rounded-full border border-green-700 "
                >
                    <IconsLucide 
                        name="Plus" 
                        class="w-4 h-4 text-green-800"
                    />
                    
                </button>
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

                
                <!-- URL do livro -->
                <div>
                    <label class="block text-xs font-medium text-gray-700">URL do Livro</label>
                    <input
                    v-model="book.wUrl"
                    type="text"
                    placeholder="https://..."
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
                :disabled="isLoading"
            >
            <IconsLucide 
                name="Save" 
                class="w-4 h-4 mr-2 text-white"
            />
              Salvar
            </button>
        </div>
        </form>
        
        <!-- Modal de criação do livro -->
        <div
            v-if="isCreatingBook"
            class="fixed top-14 inset-0 flex items-center justify-center bg-gray-900 z-50"
        >
            <div class="bg-white  shadow-lg p-4 w-96">
                <h2 class="text-base text-gray-700 font-semibold mb-4">Adicionar Livro</h2>
                <form @submit.prevent="onSubmit" class="space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-gray-700">Título:</label>
                        <input
                            v-model="title"
                            type="text"
                            placeholder="Título do Livro"
                            class="w-full px-3 py-2 border rounded-md"
                        />
                        <span class="text-red-500 text-sm">{{ errors.title }}</span>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-700">URL do Livro:</label>
                        <input
                            v-model="wUrl"
                            type="text"
                            placeholder="URL do Livro"
                            class="w-full px-3 py-2 border rounded-md"
                        />
                        <span class="text-red-500 text-sm">{{ errors.wUrl }}</span>
                    </div>

                    <div>                        
                        <label class="block text-xs font-medium text-gray-700">URL da Capa:</label>
                        <input
                            v-model="cover"
                            type="text"
                            placeholder="URL da Capa"
                            class="w-full px-3 py-2 border rounded-md"
                        />
                        <span class="text-red-500 text-sm">{{ errors.cover }}</span>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-700">Gênero:</label>
                        <input
                            v-model="genre"
                            type="text"
                            placeholder="Gênero"
                            class="w-full px-3 py-2 border rounded-md"
                        />
                        <span class="text-red-500 text-sm">{{ errors.genre }}</span>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-700">Subgênero:</label>
                        <input
                            v-model="subGenre"
                            type="text"
                            placeholder="Subgênero"
                            class="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-700">Status:</label>
                        <select 
                            name="bookStatus" id="bookStatus"
                            v-model="status"
                            class="text-gray-700 w-full px-3 py-2 border rounded-md"
                        >
                            <option value="" disabled selected>Selecione o status</option>
                            <option value="concluido">Concluído</option>
                            <option value="emAndamento">Em Andamento</option>
                        
                        </select>
                        <span class="text-red-500 text-sm">{{ errors.status }}</span>
                    </div>
                    <button
                        type="submit"
                        class="flex items-center justify-center px-3 py-1 bg-indigo-600 text-white text-sm rounded-md shadow hover:bg-indigo-700 transition w-full mt-4"
                        :disabled="isLoadingCreatingBook"
                    >
                      Adicionar Livro
                    </button>



                    
                <!-- Loader de carregamento criando livro -->
                <div v-if="isLoadingCreatingBook" class="fixed inset-0 bg-black/50 flex items-center justify-center z-9999">
                    <div class="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                        <IconsLucide name="Loader2" class="h-10 w-10 text-blue-600 animate-spin" />
                        <p class="text-zinc-800 dark:text-zinc-100 font-semibold text-lg">Registrando o Livro</p>
                    </div>
                </div>




                </form>
                <button
                  @click.prevent.stop="isCreatingBook = false" 
                  class="absolute top-1 right-2 text-gray-300 bg-gray-800 hover:text-gray-800 focus:outline-none focus:ring focus:ring-gray-300 rounded-full p-1 transition duration-150 ease-in-out" 
                >
                  <IconsLucide 
                      name='X' 
                      class='w-[20px] h-[20px]'
                  />
                </button>
            </div>
        </div>

        <!-- Loader de carregamento de dados -->
        <div v-if="isLoading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                <IconsLucide name="Loader2" class="h-10 w-10 text-blue-600 animate-spin" />
                <p class="text-zinc-800 dark:text-zinc-100 font-semibold text-lg">Carregando</p>
            </div>
        </div>
      </main>
    </div>
  </template>
  