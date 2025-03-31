<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForm, useField, useFieldError } from 'vee-validate'
import * as yup from 'yup'
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import IconsLucide from '@/helpers/IconsLucide.vue';
import { LoginApi, verifyToken } from '@/API/usersApi'
import { toTypedSchema } from '@vee-validate/yup'

const isDarkMode = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const isPasswordVisible = ref(false)

const schema = yup.object({
    username: yup.string().required('Entre com seu usuário.').min(3, 'Usuário mínimo 3 caracteres.'),
    senha: yup.string().required('Entre com a sua senha.').min(6, 'Senha mínimo 6 caracteres'),
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
            if (response.token) {
                return response
            } 
            
            throw new Error(response.data?.error || 'Login falhou') 
        } catch (error) {
            console.error("Erro na requisição:", error)
            successMessage.value = ''
            throw new Error(error.response?.data?.message || 'Erro desconhecido')
        }
    },
    onSuccess: async (data) => {
        localStorage.setItem('token', data.token) // Armazena o token no localStorage

        successMessage.value = 'Verificando token...'
        
        try {
            const verifyTokens = await verifyToken(data) // Verifica o token
            if(!verifyTokens.data.userWtp) {
                successMessage.value = ''
                errorMessage.value = verifyTokens.data.error
                localStorage.removeItem('token') // Remove o token inválido do localStorage
                return
            }
          
            setTimeout(() => {
                successMessage.value = 'Logado com sucesso!'
                errorMessage.value = '' // Limpa a mensagem de erro
                localStorage.setItem('user', JSON.stringify({
                    userWtp: verifyTokens.data.userWtp,
                    role: verifyTokens.data.role,
                    subRole: verifyTokens.data.subRole,
                })) // Armazena os dados do usuário no localStorage
                setTimeout(() => {
                    successMessage.value = 'Redirecionando para a página inicial...'
                    window.location.href = '/' // Redireciona para a página inicial após 2 segundos
                }, 2000);
            }, 1000)
        } catch (error) {
            console.error('Erro na verificação do token:', error)
            errorMessage.value = 'Erro na verificação do token!'
            successMessage.value = ''
            localStorage.removeItem('token') // Remove o token inválido do localStorage
            localStorage.removeItem('user') // Remove os dados do usuário do localStorage
        }
    },
    onError: (error) => {
        console.error('Erro no login:', error) // 🔥 Ver o erro
        if (axios.isAxiosError(error)) {
            errorMessage.value = 'Usuário ou senha incorretos!' 
        } else {
            console.error('Erro desconhecido:', error.message) // 🔥 Ver erro desconhecido
        }
        errorMessage.value = 'Erro ao fazer login. Verifique seus dados e tente novamente!' 
        successMessage.value = '' // Limpa a mensagem de sucesso
        isLoading.value = false // Para o carregamento
    },
})

const onSubmit = handleSubmit((values: { username: string; senha: string }) => {
    successMessage.value = 'Logando!'
    errorMessage.value = '' // Limpa a mensagem de erro
    isLoading.value = true // Inicia o carregamento
    loginMutation.mutate(values)
})

const handleSetDarkMode = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

const handleSeePaassword = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}

onMounted(() => {
    isDarkMode.value = localStorage.getItem('theme') === 'dark'
    const token = localStorage.getItem('token')
    if (token) {
        successMessage.value = 'Você já está logado! Redirecionando...'
        setTimeout(() => {
            window.location.href = '/'
        }, 2000)
    } else {
        successMessage.value = ''
    }
    
    setTimeout(() => {
        const senhaInput = document.getElementById('senha') as HTMLInputElement
        if (senhaInput && senhaInput.value) {
            senha.value = senhaInput.value // Força a atualização do v-model
        }
    }, 500)
})
</script>
<template>
    <div
        class="flex flex-col lg:flex-row items-center justify-center h-screen relative"
        :class="isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'"
    >
        <div class="absolute flex items-center gap-3 top-3 left-2 w-1/2 lg:top-10 ">
            <IconsLucide 
                :name="isDarkMode ? 'Sun' : 'Moon'"
                class="w-8 h-8 p-1 rounded-full cursor-pointer lg:w-10 lg:h-10"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-violet-900'"
                @click="isDarkMode = !isDarkMode; handleSetDarkMode()"
                :color="isDarkMode ? 'violet' : 'silver'"
                :stroke-width="2"
            />
            <p 
                class="text-lg font-bold cursor-pointer lg:text-2xl"
                @click="isDarkMode = !isDarkMode; handleSetDarkMode()"
                :class="isDarkMode ? 'text-violet-500 lg:text-white' : 'text-gray-800 lg:text-white'">
                Projeto Lunar
            </p>
            <span class="absolute top-0 left-24 text-[9px] font-bold cursor-pointer w-16 lg:text-sm lg:w-24 lg:left-32 lg:top-[-5px]"
                :class="isDarkMode ? 'text-purple-400' : 'text-violet-600'"
            >
                {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
            </span>
        </div>

        <div
            class="hidden lg:flex"
        >
            <img
                src="/oficial-img.jpg"
                alt="Logo do Projeto Lunar"
                class="rounded-lg shadow-lg object-cover w-11/12 "
            />
        </div>

        <div class="flex flex-col justify-center items-center w-11/12 lg:w-2/4  p-6 rounded-lg shadow-lg lg:shadow-none lg:border-none border border-gray-300"
            :class="isDarkMode ? 'bg-gray-800 border-none lg:bg-gray-900' : 'bg-white'"
        >
            <h1 class="text-2xl text-center font-bold mb-4 lg:text-5xl lg:mb-14">Login</h1>
            
            <form 
                @submit.prevent="onSubmit"
                class="flex flex-col justify-center items-center lg:w-9/12 gap-4"
            >
                <div class="mb-4 lg:w-10/12 relative">
                    <label for="username" class="block text-sm font-medium mb-2">Usuário:</label>
                    <input
                        v-model="username"
                        type="text"
                        id="username"
                        class="border border-gray-400 rounded-md p-2 w-full border-blue-300 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    <span v-if="usernameError" class="flex text-red-500 text-center w-96 absolute left-0 bottom-[-30px]">{{ usernameError }}</span>
                </div>

                <div class="mb-4 lg:w-10/12 relative">
                    <label for="senha" class="block text-sm font-medium mb-2">Senha:</label>
                    <input
                        v-model="senha"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        placeholder="Digite sua senha"
                        id="senha"
                        @change="senha = ($event.target as HTMLInputElement).value"
                        class="border border-gray-400 rounded-md p-2 w-full border-blue-300 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    <span v-if="senhaError" class="text-red-500 absolute w-96 left-0 bottom-[-30px]">{{ senhaError }}</span>
                    <IconsLucide 
                        :name="isPasswordVisible ? 'EyeOff' : 'Eye'"
                        class="absolute right-3 bottom-0 transform -translate-y-1/2 cursor-pointer"
                        @click="handleSeePaassword()"
                        color="black"
                        :stroke-width="2"
                    />
                </div>

                <button
                    type="submit"
                    class="text-white py-2 px-4 rounded-md  transition duration-200 ease-in-out w-full lg:w-10/12"
                    :disabled="isLoading"
                    :class="isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'"
                >
                    Login
                </button>
            </form>
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

        
        <div 
            v-if="errorMessage"
            class="absolute bottom-16 left-auto w-full lg:w-1/4 lg:right-44 flex items-center justify-center"
            :class="isDarkMode ? 'bg-gray-800/50' : 'bg-gray-400/50'"
        >
            <div 
                class="p-4 text-center"
            >
                <p class="text-red-700 font-bold">{{ errorMessage }}</p>
            </div>
        </div>

        <div
            v-if="successMessage"
            class="absolute bottom-20 left-auto w-full lg:w-1/4 lg:right-44 flex items-center justify-center"
        >
            <p
                class="p-1 text-center font-bold"
                :class="isDarkMode ? 'text-green-500' : 'text-green-700'"
            >
                {{ successMessage }}
            </p>
        </div>
    </div>
</template>

