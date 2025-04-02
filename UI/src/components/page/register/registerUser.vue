<script setup lang="ts">
import { ref, onMounted, inject, nextTick } from 'vue'
import { useForm, useField, useFieldError } from 'vee-validate'
import * as yup from 'yup'
import { useMutation } from '@tanstack/vue-query'
import IconsLucide from '@/helpers/IconsLucide.vue';
import { toTypedSchema } from '@vee-validate/yup'
import { RegisterApi } from '@/API/usersApi'

const isDarkMode = ref(false)
const isLogged = ref(false)
const userLogged= ref('')

const isLoading = ref(false)
const isError = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isAdmin = ref(false)
const isPasswordVisible = ref(false)

const handleIsAdmin = async () => {
    await nextTick() // Aguarda o Vue renderizar a página

    const userStorage = localStorage.getItem('user')
    const parsedUser = userStorage ? JSON.parse(userStorage) : null

    if (parsedUser && parsedUser.role !== 'admin') {
        console.warn('Usuário sem permissão, redirecionando...')
        window.location.href = '/'
    } else if (parsedUser && parsedUser.role === 'admin') {
        isAdmin.value = true
        isLogged.value = true
        userLogged.value = parsedUser.userWtp // Armazena o usuário logado
        return;
    }

    isAdmin.value = false // Inicializa como false para evitar acesso não autorizado
}


const schema = yup.object({
    name: yup.string().required('Name é obrigatório'),
    userWtp: yup.string().required('Usuário é obrigatório').min(3, 'Usuário deve ter pelo menos 3 caracteres'),
    password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: yup.string().required('Confirmação de password é obrigatória').oneOf([yup.ref('password'), null], 'As senhas devem corresponder'),
    role: yup.string().oneOf(['admin', 'user']).default('user'), // Adicionando o campo de role
})

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema), // Correção aqui
})

const { value: name } = useField('name')
const { value: userWtp } = useField('userWtp')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')
const { value: role } = useField('role')

const nameError = useFieldError('name')
const userWattpadError = useFieldError('userWtp')
const senhaError = useFieldError('password')
const senhaConfirmError = useFieldError('confirmPassword')

const registerMutation = useMutation({
    mutationFn: async (data: { name: string; userWtp: string; password: string; role: string; createdBy?: string }) => {
        isLoading.value = true
        if (isAdmin.value) {
            data.createdBy = userLogged.value // Adiciona o usuário logado como criador
        } else {
            data.createdBy = null // Se não for admin, não adiciona o criador
        }
        try {
            const response = await RegisterApi(data)
            return response.data
        } catch (error) {
            console.error("Erro na requisição:", error)
            successMessage.value = ''
            throw new Error(error.response?.data?.message || 'Erro desconhecido')
        }
    },
    onSuccess: async (data) => {
        successMessage.value = 'Usuário registrado com sucesso!'
        setTimeout(() => {
            window.location.href = '/login'
        }, 2000)
    },
    onError: (error) => {
        isError.value = true
        errorMessage.value = error.message
    },
    onSettled: () => {
        isLoading.value = false
    },
})

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    isError.value = false
    isSuccess.value = false
    errorMessage.value = ''
    successMessage.value = ''
    
    try {
        const { name, userWtp, password } = values
        await registerMutation.mutateAsync({ name, userWtp, password, role: 'user' }) 
        isSuccess.value = true
    } catch (error) {
        console.error("Erro ao registrar:", error)
        isError.value = true
        errorMessage.value = error?.response?.data?.message || 'Erro ao registrar'
    } finally {
        isLoading.value = false // 🔥 Agora sempre libera o botão
    }
})

const handleSetDarkMode = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

const handleSeePaassword = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}

onMounted(() => {    
    handleIsAdmin() // Verifica se o usuário é admin ao montar o componente
    isDarkMode.value = localStorage.getItem('theme') === 'dark'
})
</script>

<template>
    <div
        class="flex flex-col items-center justify-center h-screen w-full"
        :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
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
                :class="isDarkMode ? 'text-violet-500 lg:text-white' : 'text-violet-900'">
                Projeto Lunar
            </p>
            <span class="absolute top-0 left-24 text-[9px] font-bold cursor-pointer w-16 lg:text-sm lg:w-24 lg:left-32 lg:top-[-5px]"
                :class="isDarkMode ? 'text-purple-400' : 'text-violet-600'"
            >
                {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
            </span>
        </div>
        <form
            @submit="onSubmit"
            class="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm mt-32 lg:mt-0 lg:w-1/2 lg:max-w-lg"
            :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
        >
            <h2 
                class="text-2xl font-bold mb-6 text-center"
                :class="isDarkMode ? 'text-white' : 'text-purple-700'"
            >
                Registrar novo Usuário
            </h2>
            <div class="mb-4">
                <label 
                    for="name" 
                    class="block"
                    :class="isDarkMode ? 'text-gray-300' : 'text-purple-700'"
                >
                    Nome:
                </label>
                <input
                    v-model="name"
                    placeholder="Digite seu nome"
                    type="text"
                    id="name"
                    class="appearance-none border border-slate-500/40 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-700"
                    :class="isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'"
                />
                <span v-if="nameError" class="text-red-500 text-xs italic">{{ nameError }}</span>
            </div>
            <div class="mb-4">
                <label 
                    for="usetWtp"
                    class="block"
                    :class="isDarkMode ? 'text-gray-300' : 'text-purple-700'"
                >
                    Usuário WattPad:
                </label>
                <input
                    v-model="userWtp"
                    placeholder="Digite seu usuário do WattPad sem @"
                    type="text"
                    id="usetWtp"
                    class="appearance-none border border-slate-500/40 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-700"
                    :class="isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'"
                />
                <div
                    class="flex items-center gap-1 mt-1"
                >
                    <IconsLucide
                        name="Info"
                        :color="isDarkMode ? 'white' : 'black'"
                        class="w-4 h-4"
                    />
                    <span 
                        class="text-sm font-smibold"
                        :class="isDarkMode ? 'text-gray-300' : 'text-slate-500'"
                    >
                        Lembre-se: esse usuário será usado para login!
                    </span>
                </div>
                <span v-if="userWattpadError" class="text-red-500 text-xs italic">{{ userWattpadError }}</span>
            </div>
            <div class="mb-4">
                <label 
                    for="password" 
                    class="block"
                    :class="isDarkMode ? 'text-gray-300' : 'text-purple-700'"
                >
                    Senha:
                </label>
                
                <div class="mb-4 w-full relative">
                    <input
                        v-model="password"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        placeholder="Digite sua senha: mínimo 6 caracteres"
                        id="senha"
                        @change="password = ($event.target as HTMLInputElement).value"
                        class="appearance-none border border-slate-500/40 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-700"
                        :class="isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'"
                    />
                    <IconsLucide 
                        :name="isPasswordVisible ? 'EyeOff' : 'Eye'"
                        class="absolute right-3 bottom-0 transform -translate-y-1/2 cursor-pointer"
                        @click="handleSeePaassword()"
                        color="black"
                        :stroke-width="2"
                    />
                </div>
                <span v-if="senhaError" class="text-red-500 text-xs italic">{{ senhaError }}</span>
            </div>
            <div class="mb-4">
                <label 
                    for="senhaConfirm" 
                    placeholder="Digite sua senha novamente"
                    class="block"
                    :class="isDarkMode ? 'text-gray-300' : 'text-purple-700'"
                >
                    Confirmação de Senha:
                </label>
                <input
                    v-model="confirmPassword"
                    type="password"
                    id="senhaConfirm"
                    class="appearance-none border border-slate-500/40 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-700"
                    :class="isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'"
                />
                <span v-if="senhaConfirmError" class="text-red-500 text-xs italic">{{ senhaConfirmError }}</span>
            </div>
            <div
                v-if="isAdmin"
            >
                <label 
                    for="role"
                    class="block"
                    :class="isDarkMode ? 'text-gray-300' : 'text-purple-700'"
                >
                    Tipo de Usuário
                </label>
                <select 
                    v-model="role" 
                    id="role" 
                    class="appearance-none border border-slate-500/40 rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-700"
                >
                    <option value="user">Membro</option>
                    <option value="admin">Administrador</option>
                </select>                
            </div>
            <div>
                <span class="text-gray-500 text-sm">Ao clicar em "Registrar", você concorda com nossos <router-link to="#" class="text-blue-500 hover:underline">Termos de Serviço</router-link> e <router-link to="#" class="text-blue-500 hover:underline">Política de Privacidade</router-link>.</span>
            </div>
            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                :disabled="isLoading"
                :class="isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'"
            >
                Registrar
            </button>
            <div v-if="isLoading" class="flex items-center justify-center mt-4">
                <IconsLucide name="Loader" class="animate-spin h-7 w-7 lg:w-10 lg:h-10 text-blue-500" :stroke-width="2"/>
            </div>
            <div class="flex flex-col items-center justify-center mt-4 text-sm lg:text-base font-semibold gap-3">
                <router-link to="/login" class="text-blue-600 hover:underline">Já tem uma conta? Faça login</router-link>
                <router-link to="/" class="text-blue-600  hover:underline">Voltar para o início</router-link>
                <span v-if="errorMessage" class="text-red-500 font-bold lg:text-lg">{{ errorMessage }}</span>
                <span v-if="successMessage" class="text-green-500 font-bold lg:text-lg">{{ successMessage }}</span>
            </div>
        </form>

    </div>
</template>