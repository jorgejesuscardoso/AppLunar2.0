<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import IconsLucide from '@/helpers/IconsLucide.vue'

const theme = inject('isDarkMode')
const isDarkMode = ref(theme)

const handleLogout = () => {
    localStorage.removeItem('user')
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
        <span 
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