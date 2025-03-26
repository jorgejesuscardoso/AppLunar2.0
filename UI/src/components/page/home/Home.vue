<script setup>
import CardFeed from '@/components/cards/cardFeed.vue';
import FormQuillEditor from '@/components/Forms/QuillEditor/textArea.vue';
import { ref, inject } from 'vue';

const isDarkMode = inject('isDarkMode');
</script>

<template>
  <main
    class="flex flex-col md:items-center justify-start min-h-screen text-gray-700 bg-white"
    :class="isDarkMode ? 'dark' : ''"
  >
    <div
      class="flex flex-col items-center justify-center md:w-3/5  h-full w-full md:p-5 p-1"
    >
      <FormQuillEditor />
    </div>
    
    <div
      class="flex flex-col items-center justify-center lg:w-[53%] p-1 bg-gray-200 rounded-lg"
      :class="isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/70'"
    >
      <CardFeed />
    </div>

    <section
      class="flex flex-col items-center justify-center md:w-3/5 h-full md:p-5"
    >
    <span
      class="border border-gray-400/50 w-11/12"
    ></span>
      
    </section>
  </main>
</template>

<style scoped>
  .dark {
    background-color: var(--bg-dark-2) !important;
    color: #e2e8f0 !important;
  }

  .darkFeed {
    background-color: #302d2d !important;
  }

</style>
