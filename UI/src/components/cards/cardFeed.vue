<script setup>
import { testData } from '@/assets/fakeFeed.ts';
import { inject } from 'vue';
import IconsLucide from '@/helpers/IconsLucide.vue';

const isDarkMode = inject('isDarkMode');
</script>

<template>
    <div
        class="flex flex-col items-center justify-center gap-2 min-h-screen min-w-full rounded-lg lg:p-5 p-1"
      >
        <!-- Cards de feed -->
        <div
          v-for="(item, index) in testData"
          :key="index"
          class="flex w-full items-center justify-start p-1 text-neutral-700  shadow-md rounded-lg"
        >
          <div
            class="flex flex-col w-full justify-start p-5 text-neutral-700 gap-5 rounded-lg"
            :class="isDarkMode ? 'bg-gray-100/10' : 'bg-white'"
          >
            <div
              class="flex items-center justify-between"
            >
              <h3
                class="flex justify-center items-center gap-3 text-lg font-bold md:text-xl"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
              <span
                class="flex items-center justify-center rounded-full p-1 bg-gray-400/70"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                <IconsLucide name="User" class="w-7 h-7" color="black"/>
              </span>
                {{ item.username }}
              </h3>
              <span
                class="text-sm "
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
              </span>

            </div>
            <div
              class="flex flex-col items-start justify-start w-full p-5 min-h-32 rounded-lg shadow"
            >
              <p
                class="text-sm  md:text-lg"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
</template>