<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForm, useField, useFieldError } from 'vee-validate'
import * as yup from 'yup'
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import IconsLucide from '@/helpers/IconsLucide.vue';
import { LoginApi } from '@/API/usersApi'
import { toTypedSchema } from '@vee-validate/yup'

const isDarkMode = ref(false)

const schema = yup.object({
    username: yup.string().required().min(3, 'Usuário deve ter pelo menos 3 caracteres'),
    senha: yup.string().required().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema), // Correção aqui
})


const { value: username } = useField('username')
const { value: senha } = useField('senha')
const usernameError = useFieldError('username')
const senhaError = useFieldError('senha')

const loginMutation = useMutation({
    mutationFn: async (data: { username: string; senha: string }) => {
        try {
            const response = await LoginApi(data.username, data.senha)
            console.log('Response:', response) // 🔥 Ver se tem algum erro mesmo
            
            // Se a API retorna um token, assume que tá tudo certo
            if (response.status === 200 && response.data) {
                if (response.data.error) {
                    console.warn("API retornou erro junto com sucesso:", response.data.error)
                    // Decide se quer tratar isso como erro ou só logar
                }
                return response.data // ✅ Sucesso
            }
            
            throw new Error(response.data?.error || 'Login falhou')
        } catch (error) {
            console.error("Erro na requisição:", error)
            throw new Error(error.response?.data?.message || 'Erro desconhecido')
        }
    },
    onSuccess: (data) => {
        console.log('Login bem-sucedido:', data)
    },
    onError: (error) => {
        console.error('Login falhou:', error.message)
    },
})

const onSubmit = handleSubmit((values: { username: string; senha: string }) => {
    loginMutation.mutate(values)
    console.log('Form submitted:', values)
})

const handleSetDarkMode = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
    isDarkMode.value = localStorage.getItem('theme') === 'dark'
})
</script>
<template>
    <div
        class="flex flex-col items-center justify-center h-screen relative"
        :class="isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'"
    >
        <div class="absolute flex items-center gap-3 top-3 left-2 w-1/2">
            <IconsLucide 
                :name="isDarkMode ? 'Sun' : 'Moon'"
                class="w-8 h-8 p-1 rounded-full cursor-pointer"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-violet-900'"
                @click="isDarkMode = !isDarkMode; handleSetDarkMode()"
                :color="isDarkMode ? 'violet' : 'silver'"
                :stroke-width="2"
            />
            <p class="text-lg font-bold" :class="isDarkMode ? 'text-violet-500' : 'text-gray-800'">
                Projeto Lunar
            </p>
            <span class="absolute top-0 left-24 text-[9px] font-bold cursor-pointer w-16"
                :class="isDarkMode ? 'text-purple-400' : 'text-violet-600'"
            >
                {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
            </span>
        </div>

        <div class="flex flex-col w-11/12 p-6 rounded-lg shadow-lg border border-gray-300"
            :class="isDarkMode ? 'bg-gray-800 border-none' : 'bg-white'"
        >
            <h1 class="text-2xl text-center font-bold mb-4">Login</h1>
            
            <form @submit.prevent="onSubmit">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium mb-2">Usuário:</label>
                    <input
                        v-model="username"
                        type="text"
                        id="username"
                        class="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <span v-if="usernameError" class="text-red-500">{{ usernameError }}</span>
                </div>

                <div class="mb-4">
                    <label for="senha" class="block text-sm font-medium mb-2">Senha:</label>
                    <input
                        v-model="senha"
                        type="password"
                        id="senha"
                        class="border border-gray-300 rounded-md p-2 w-full text-black"
                    />
                    <span v-if="senhaError" class="text-red-500">{{ senhaError }}</span>
                </div>

                <button
                    type="submit"
                    class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out w-full"
                >
                    Login
                </button>
            </form>
        </div>

        <div class="flex flex-col items-center justify-center mt-4 text-sm gap-3">
            <span>
                Não tem uma conta?
                <router-link to="/register" class="text-blue-500 hover:underline">
                    Registre-se
                </router-link>
            </span>
            <router-link to="/" class="text-blue-500 hover:underline">
                Voltar para o início
            </router-link>
        </div>
    </div>
</template>

