<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import IconsLucide from '@/helpers/IconsLucide.vue'

const theme = inject('isDarkMode')
const isLogged = inject('isLogged')
const isDarkMode = ref(theme)
const isLoggedValue = ref(isLogged)

const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.href = '/'
}

</script>
<template>
    <div
        class="fixed flex items-center justify-around w-full h-[5vh] bottom-0"
        :class="isDarkMode ? 'bg-[#020202]' : 'bg-white'"
    >
        <router-link 
            to="/profile"
        >
            <IconsLucide
                name="User"
                class="w-7 h-7 text-gray-500 dark:text-gray-400 cursor-pointer"
                :color="isDarkMode ? 'white' : 'black'"
            />
        </router-link>
        <router-link 
            to="/"
        >
            <IconsLucide
                name="Home"
                class="w-7 h-7 text-gray-500 dark:text-gray-400 cursor-pointer"
                :color="isDarkMode ? 'white' : 'black'"
            />
        </router-link>
        <router-link 
            to="/settings"
        >
            <IconsLucide
                name="Settings"
                class="w-7 h-7 text-gray-500 dark:text-gray-400 cursor-pointer"
                :color="isDarkMode ? 'white' : 'black'"
            />
        </router-link>
        <router-link 
            v-if="!isLoggedValue"
            to="/login"
        >
            <IconsLucide
                name="LogIn"
                class="w-7 h-7 text-gray-500 dark:text-gray-400 cursor-pointer"
                :color="isDarkMode ? 'white' : 'black'"
            />
        </router-link>
        <span 
            v-if="isLoggedValue"
            @click="handleLogout"
            class="cursor-pointer"
        >
            <IconsLucide
                name="LogOut"
                class="w-7 h-7 text-gray-500 dark:text-gray-400 cursor-pointer"
                :color="isDarkMode ? 'white' : 'black'"
            />
        </span>
        
    </div>
</template>