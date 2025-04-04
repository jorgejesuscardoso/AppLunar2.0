<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { GetUserApi } from '@/API/usersApi'

const theme = inject('isDarkMode')
const isLogged = inject('isLogged')
const isDarkMode = ref(theme)

console.log('isDarkMode', theme)
console.log('isLogged', isLogged)

const handleIsLogge = () => {
  if (!isLogged) {
    window.location.href = '/login'
    return;
  } 
}

onMounted(() => {
  handleIsLogge()
})
</script>

<template>
    <div 
        class="w-full min-h-screen flex flex-col items-center justify-center"
        :class="isDarkMode ? 'bg-[#0f1218] text-white' : 'bg-white text-gray-900'"
    >
        <div class="profile-header">
        <h1>Profile</h1>
        </div>
        <div class="profile-content">
        <p>User Profile Information</p>
        </div>
    </div>
</template>