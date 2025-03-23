<script setup lang="ts">
import IconsLucide from '@/helpers/IconsLucide.vue';

</script>

<template>
    <div
    >
      <!-- Navbar fixa -->
      <nav
        class="hidden md:flex md:flex-col justify-start items-center p-4 text-white bg-gradient-to-tl from-[#10031c] via-[#1b052e] to-[#04010c]  md:absolute md:h-[95%] md:w-52 md:my-5 md:ml-1 rounded-3xl"
      >
        <div
            class="flex gap-3 items-center justify-center w-full h-20 mb-4 "
        >
            <IconsLucide 
                name="Moon"
                class="w-8 h-8"

            />
            <p
                class="text-xl font-bold"
            >
                Projeto Lunar
            </p>
        </div>
      </nav>
  
      <!-- Conteúdo da rota muda aqui -->
      <main>
        <router-view />
      </main>
    </div>
  </template>
  