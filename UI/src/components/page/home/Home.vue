<script setup>
import FormQuillEditor from '@/components/Forms/QuillEditor/textArea.vue';
import { ref, inject } from 'vue';
import { testData } from '@/assets/fakeFeed.ts';

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
    <section
      class="flex flex-col items-center justify-center md:w-3/5 h-full md:p-5"
    >
    <span
      class="border border-gray-400/50 w-11/12"
    ></span>
      <div
        class="flex flex-col items-center justify-center  min-h-screen w-full md:p-7 p-2"
      >
        <!-- Cards de feed -->
        <div
          v-for="(item, index) in testData"
          :key="index"
          class="flex w-full items-center justify-start p-1 text-neutral-700 bg-gray-200/70"
          :class="isDarkMode ? 'bg-gray-900/30' : ''"
        >
          <div
            class="flex flex-col w-full justify-start p-5 text-neutral-700 bg-white gap-5"
            :class="isDarkMode ? 'bg-gray-100/50' : ''"
          >
            <div
              class="flex items-center justify-between"
            >
              <h3
                class="text-lg font-bold text-neutral-700 md:text-xl"
                :class="isDarkMode ? 'text-neutral-100' : ''"
              
              >
                {{ item.username }}
              </h3>
              <span
                class="text-sm text-neutral-700 "
                :class="isDarkMode ? 'text-neutral-100' : ''"
              >
                {{ new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
              </span>

            </div>
            <div
              class="flex flex-col items-start justify-start w-full gap-2"
            >
              <h3
                class="text-lg font-bold text-neutral-700 md:text-xl"
                :class="isDarkMode ? 'text-neutral-100' : ''"
              >
                {{ item.title }}
              </h3>
              <p
                class="text-sm text-neutral-700 md:text-lg"
                :class="isDarkMode ? 'text-neutral-500' : ''"
              >
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
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
