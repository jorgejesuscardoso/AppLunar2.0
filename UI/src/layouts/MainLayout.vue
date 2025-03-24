<script setup lang="ts">
import IconsLucide from '@/helpers/IconsLucide.vue';
import { ref } from 'vue';

const showMenu = ref(false);


</script>

<template>
    <div
        class="bg-gray-200"
    >
      <!-- Navbar fixa -->
      <nav
        class="hidden md:flex md:flex-col justify-start items-center p-4 text-gray-800 md:bg-white md:absolute md:h-[95%] md:w-52 md:my-5 md:ml-1 md:rounded-2xl md:shadow-lg md:shadow-gray-300 md:border md:border-gray-300 relative border-b border-gray-700 shadow-lg bg-white"
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
            class="flex md:flex-col items-start justify-start w-full rounded-2xl gap-3 2xl:text-xl"
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
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="User"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Perfil
                </p>
            </router-link>

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Layout"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Dashboard
                </p>
            </router-link>

            <router-link
                to="/warning"
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
                to="/warning"
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

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Users"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Subgrupos
                </p>
            </router-link>

            
            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Store"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Lojinha Lunar
                </p>
            </router-link>

















            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 md:absolute md:bottom-0 md:mb-10"
            >
                <IconsLucide 
                    name="Settings"
                    class="w-7 h-7"
                    color="black"
                    :strokeWidth="1.5"
                />
                <p
                    class="ml-2"
                >
                    Configurações
                </p>
            </router-link>
        </div>
      </nav>

      <nav
        class="md:hidden flex justify-between items-center p-4 text-gray-800 bg-white shadow-lg relative"
        >
        <div
            class="flex items-center justify-between w-full gap-3"
        >
            <div
                class="flex items-center justify-start gap-3"
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
            <button
                @click="showMenu = !showMenu"
            >
                <IconsLucide 
                    name="Menu"
                    class="w-8 h-8"
                    :stroke-width="1.5"
                />
            </button>
        </div>

        <div
            v-if="showMenu"
            class="flex flex-col items-start justify-start w-3/7 gap-3 absolute bg-white shadow-lg rounded-xl right-1 top-14 z-10 p-3"
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
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="User"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Perfil
                </p>
            </router-link>

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Layout"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Dashboard
                </p>
            </router-link>

            <router-link
                to="/warning"
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
                to="/warning"
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

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Users"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Subgrupos
                </p>
            </router-link>

            
            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            >
                <IconsLucide 
                    name="Store"
                    class="w-6 h-6"
                />
                <p
                    class="ml-2"
                >
                    Lojinha Lunar
                </p>
            </router-link>

















            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 md:absolute md:bottom-0 md:mb-10"
            >
                <IconsLucide 
                    name="Settings"
                    class="w-7 h-7"
                    color="black"
                    :strokeWidth="1.5"
                />
                <p
                    class="ml-2"
                >
                    Configurações
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
  