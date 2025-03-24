<script setup>
import { inject } from 'vue';

const isDarkMode = inject('isDarkMode');
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-gray-700 bg-gray-300"
    :class="isDarkMode ? 'dark' : ''"
  >
    <h1>Home</h1>
  </div>
</template>

<style scoped>
.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}
</style>