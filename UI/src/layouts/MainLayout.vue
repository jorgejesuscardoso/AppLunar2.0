<script setup lang="ts">
import IconsLucide from '@/helpers/IconsLucide.vue';

</script>

<template>
    <div
        class="bg-gray-200"
    >
      <!-- Navbar fixa -->
      <nav
        class="hidden md:flex md:flex-col justify-start items-center p-4 text-gray-800 md:bg-white md:absolute md:h-[95%] md:w-52 md:my-5 md:ml-1 md:rounded-3xl md:shadow-lg md:shadow-gray-300 md:border md:border-gray-300"
      >
        <div
            class="flex gap-3 items-center justify-start w-full h-20 mb-4 "
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
        <div
            class="flex flex-col items-start justify-start w-full rounded-3xl gap-3"
        >
            <router-link
                to="/"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Home"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Home
                </p>
            </router-link>
            <router-link
                to="/about"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Info"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Sobre
                </p>
            </router-link>
            <router-link
                to="/contact"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Mail"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Contato
                </p>
            </router-link>
        </div>
      </nav>
  
      <!-- Conteúdo da rota muda aqui -->
      <main>
        <router-view />
      </main>
    </div>
  </template>
  