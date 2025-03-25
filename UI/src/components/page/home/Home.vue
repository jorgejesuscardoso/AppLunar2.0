<script setup>
import FormQuillEditor from '@/components/Forms/QuillEditor/textArea.vue';
import { ref, inject } from 'vue';

const isDarkMode = inject('isDarkMode');
</script>

<template>
  <main
    class="flex flex-col items-center justify-start min-h-screen text-gray-700 bg-white"
    :class="isDarkMode ? 'dark' : ''"
  >
    <FormQuillEditor />
  </main>
</template>

<style scoped>
  .dark {
    background-color: var(--bg-dark-2) !important;
    color: #e2e8f0 !important;
  }

</style>