<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { GetUserByUserWtpApi } from '@/API/usersApi'
import IconsLucide from '@/helpers/IconsLucide.vue'
import { TUsers } from '@/types/user'

const theme = inject('isDarkMode')
const isDarkMode = ref(theme)
const user = ref({} as TUsers)


const handleIsLogged = () => {
    const userStorage = localStorage.getItem('user')
    const parsedUserId = JSON.parse(userStorage)
  if (!parsedUserId || !parsedUserId.userWtp) {
    window.location.href = '/login'
    return;
  } 
  
  getUser()
}

const getUser = async () => {
    const userStorage = localStorage.getItem('user')
    const parsedUserId = JSON.parse(userStorage)

  try {
    const response = await GetUserByUserWtpApi(parsedUserId.userWtp)
    user.value = response
    console.log('user', response)
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(() => {
    handleIsLogged()
})
</script>

<template>
    <div 
        class="w-full min-h-screen flex flex-col items-center justify-start "
        :class="isDarkMode ? 'bg-[#0f1218] text-white' : 'bg-white text-gray-900'"
    >
        <div
            class="w-full flex items-start justify-start gap-4 p-4 rounded-lg shadow-md mt-16"
            :class="isDarkMode ? 'bg-[#1a1d23]' : 'bg-gray-100'"
        >
            <div>
                <IconsLucide
                    name="UserCircle"
                    class="w-20 h-20"
                    :class="isDarkMode ? 'text-gray-500' : 'text-gray-900'"
                />
            </div>
            <div
                class="flex flex-col items-start justify-start gap-1 w-full rounded-md p-4 relative"
                :class="isDarkMode ? 'text-white bg-gray-400/10' : 'text-gray-900 bg-gray-300'"
            >
                <p 
                    class="flex text-xs items-center justify-between w-full"
                >
                    Nome: {{ user.name }}
                    <span
                        v-if="user.role === 'superadmin' || user.role === 'admin' || user.subRole === 'adminTrainee'"
                        class="absolute text-[10px] font-semibold border-2 border-green-500 rounded-full px-2 py-[5px] flex items-center justify-center right-2 top-2"
                        :class="isDarkMode ? 'text-green-500' : 'text-green-700'"
                    >
                        {{ user.role === 'superadmin' ? ' Super Admin ' : user.role === 'admin' ? ' Adm ' : user.subRole === 'adminTrainee' ? '  Adm Trainee ' : '' }}
                    </span>
                </p>
                <p 
                    class="text-xs"
                >
                    Wattpad: {{ user.userWtp }}
                </p>
                <p 
                    class="text-xs"
                >
                    Membro desde: {{ new Date(user.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) }}
                </p>
                <p 
                    class="flex gap-2 text-xs"
                >
                    Subs:                     
                    <ul
                        class="flex items-start justify-start gap-2"
                        v-if="user.subs && user.subs.length > 0"
                    >
                        <li v-for="(sub, index) in user.subs" :key="index" class="text-xs">
                            {{ sub.name }}
                        </li>
                    </ul>
                    <span v-else class="text-xs font-semibold">Sem subgrupo</span>
                </p>
            </div>
        </div>

        <div
            class="w-full flex items-start justify-start p-1 rounded-lg shadow-md"
            :class="isDarkMode ? 'bg-[#1a1d23]' : 'bg-gray-100'"
        >

            <div
                class="flex flex-col items-start justify-start gap-1 w-full rounded-md p-4 relative"
                :class="isDarkMode ? 'text-white bg-gray-400/10' : 'text-gray-900 bg-gray-300'"
            >
                <h1
                    class="flex items-center gap-2 text-sm font-semibold"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    <IconsLucide
                        name="BookOpen"
                        class="w-4 h-4"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    />
                    Suas Obras:
                </h1>
                <div 
                    class="flex flex-wrap gap-1 mt-4 w-scren max-h-52 items-start "
                    :class="{
                        'grid grid-cols-3 overflow-y-auto justify-around': user.books && user.books.length > 2,
                        'justify-center gap-4 w-full': user.books && user.books.length <= 2,
                        'bg-gray-400/10': isDarkMode,
                        'bg-gray-300': !isDarkMode

                    }"

                >
                <div
                        v-if="user.books && user.books.length > 0"
                        v-for="(book, index) in user.books" :key="index"
                        class="flex flex-col items-center justify-center gap-2 p-2 rounded-md mt-2"
                    >
                        <img 
                            :src="book.cover"
                            :alt="`Capa do livro ${ book.title }`"
                            class="w-16 h-16 rounded-md"
                        >
                        <div class="flex flex-col items-center justify-between h-16 gap-1 overflow-hidde">
                            <p 
                                class="text-[10px] font-semibold"
                            >
                                {{ book.title }}
                            </p>
                            <p 
                                class="text-[10px] font-semibold"
                                :class="book.status === 'Concluído' ? 'text-green-500' :  'text-yellow-700'"
                            >
                                {{ book.status }}
                            </p>
                        </div> 
                    </div>
                    <div
                        v-else
                        class="flex items-center justify-center w-full h-16"
                    >
                        <p 
                            class="text-xs font-semibold"
                        >
                            Você ainda não adicionou nenhuma obra.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <div
            class="w-full flex items-start justify-start p-1 rounded-lg shadow-md mt-4"
            :class="isDarkMode ? 'bg-[#1a1d23]' : 'bg-gray-100'"
        >
            <div
                class="flex flex-col items-start justify-start gap-1 w-full rounded-md p-4 relative"
                :class="isDarkMode ? 'text-white bg-gray-400/10' : 'text-gray-900 bg-gray-300'"
            >
                <h1
                    class="flex items-center gap-2 text-sm font-semibold"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    <IconsLucide
                        name="History"
                        class="w-4 h-4"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    />
                    Suas Publicações:
                </h1>
                <p 
                    class="text-xs font-semibold mt-2"
                >
                    Em breve...
                </p>
            </div>
        </div>

    </div>
</template>