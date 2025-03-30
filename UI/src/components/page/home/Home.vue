<script setup>
import Banners from '@/components/banners/banners.vue';
import CardFeed from '@/components/cards/cardFeed.vue';
import FormQuillEditor from '@/components/Forms/QuillEditor/textArea.vue';
import { ref, inject } from 'vue';

const isDarkMode = inject('isDarkMode');

</script>

<template>
  <main
    class="flex flex-col md:items-center justify-start min-h-screen text-gray-700 bg-gray-100"
    :class="isDarkMode ? 'dark' : ''"
  >
    <div
      class="flex flex-col items-center justify-start w-full h-72 rounded-lg relative z-0 lg:absolute"
    >
      <Banners />
    </div>
    <div
      class="flex flex-col items-center justify-center xl:w-3/5  h-full w-full p-1 lg:mt-52"
    >
      <FormQuillEditor />
    </div>
    
    <div
      class="flex flex-col items-center justify-center xl:w-[53%] p-1  shadow-2xl rounded-lg "
      :class="isDarkMode ? 'bg-gray-900/30 border border-gray-800/40' : 'bg-white'"
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
