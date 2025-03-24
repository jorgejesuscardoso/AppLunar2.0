<script setup lang="ts">
import IconsLucide from '@/helpers/IconsLucide.vue';
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const showMenu = ref(false);
const isLogged = ref(false);
const menuRef = ref(null); // Referência para o menu
const buttonRef = ref(null); // Referência para o botão
const animateMoon = ref(false);
const showDiv = ref(false);
const showConfigMenu = ref(false);

// Função para fechar o menu ao clicar fora dele
const handleClickOutside = (event) => {
  // Certifique-se de que menuRef e buttonRef não são nulos
  if (menuRef.value && buttonRef.value && !menuRef.value.contains(event.target) && !buttonRef.value.contains(event.target)) {
    showMenu.value = false;
  }
};

const handleAnmation = () => {
    animateMoon.value = !animateMoon.value;
};

const handleShowDiv = () => {
    showDiv.value = !showDiv.value;
};

// Adiciona o evento de click fora do menu
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Remove o evento de click fora do menu
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});



</script>

<template>
    <div
        class="bg-gray-200"
    >
      <!-- Navbar fixa -->
      <nav
        class="hidden md:flex md:flex-col justify-start items-center p-4 text-gray-800 md:bg-white md:absolute md:h-[95%] md:w-60 2xl:w-80 md:my-5 md:ml-1 md:rounded-2xl md:shadow-md md:shadow-gray-300 md:border md:border-gray-300 relative border-b border-gray-700 shadow-lg bg-white"
      >
        <div
            class="flex items-center gap-3 p-3 w-full h-24 mb-4 "
        >
            <IconsLucide 
                name="Moon"
                class="w-8 h-8"
                :class="animateMoon ? 'animate-spin' : ''"
                @click="handleAnmation"
                color="purple"
                :stroke-width="1"
            />
            <p
                class="text-xl font-bold text-violet-800"
            >
                Projeto Lunar
            </p>
        </div>
        
        <span
            v-if="showDiv"
            class="w-full border border-gray-300 mb-4"
        >
        </span>
        <div
            class="flex md:flex-col items-start justify-start w-full rounded-2xl gap-1"
        >
            <router-link
                to="/"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="Home"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Home
                </p>
            </router-link>

            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="User"
                    class="w-6 h-6"                    
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Perfil
                </p>
            </router-link>

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="Layout"
                    class="w-6 h-6"                    
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Dashboard
                </p>
            </router-link>

            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="Info"
                    class="w-6 h-6"                    
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Sobre
                </p>
            </router-link>
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="Mail"
                    class="w-6 h-6"                    
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Contato
                </p>
            </router-link>

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="Users"
                    class="w-6 h-6"                    
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Subgrupos
                </p>
            </router-link>

            
            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
            >
                <IconsLucide 
                    name="Store"
                    class="w-6 h-6"                    
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Lojinha Lunar
                </p>
            </router-link>

            <span
                v-if="showDiv"
                class="w-full border border-gray-300 my-4"
            >
            </span>
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-green-600 hover:bg-green-300/50 hover:text-green-900 rounded-full p-1 px-3 text-sm font-bold"
            >
                <IconsLucide 
                    :name="isLogged ? 'LogOut' : 'LogIn'"
                    :stroke-width="1.5"
                    class="w-7 h-7"
                    :color="isLogged ? 'red' : 'green'"
                />
                <p
                    class="ml-2"
                >
                    {{ isLogged ? 'Sair' : 'Login' }}
                </p>
            </router-link>
            
            <router-link
                v-if="!isLogged"
                to="/warning"
                class="flex items-center justify-start w-full text-blue-700 hover:bg-blue-300/50 hover:text-blue-900 rounded-full p-1 px-3 text-sm font-bold"
            >
                <IconsLucide 
                    name="UserPlus"
                    :stroke-width="1.5"
                    class="w-7 h-7"
                    color="blue"
                />
                <p
                    class="ml-2"
                >
                    Registrar
                </p>
            </router-link>

            <span
                v-if="showDiv"  
                class="w-full border border-gray-300 my-4"
            >
            </span>
            
            <div
                @click="showConfigMenu = !showConfigMenu"
                class="flex items-center justify-start w-11/12 text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 p-2 h-16 px-3 text-sm md:absolute md:bottom-0 md:mb-10 font-bold border-t-4 border-gray-300 cursor-pointer"
            >
                <IconsLucide 
                    name="Settings"
                    class="w-7 h-7"
                    color="black"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Configurações
                </p>
            </div>

            <div
                v-if="showConfigMenu"
                class="flex flex-col items-start justify-start w-10/12 gap-1 absolute bg-white shadow-lg rounded-xl left-80 top-0 z-10 p-3"
            >
                <div
                    class="flex flex-col items-start justify-start w-full gap-1"
                >
                <button
                    class="flex w-full items-center justify-start text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl p-2 px-3 text-sm font-bold"
                    @click="showDiv = !showDiv"
                >
                    <IconsLucide 
                        :name="showDiv ? 'ToggleRight' : 'ToggleLeft'"
                        class="w-6 h-6"
                        :stroke-width="1.5"
                    />
                    <p class="ml-2">
                        {{ showDiv ? 'Esconder Divisas do Menu' : 'Exibir Divisas do Menu' }}
                    </p>
                </button>

                </div>
            </div>
        </div>
      </nav>

      <nav
        class="md:hidden flex justify-between items-center p-4 text-gray-800 bg-white shadow-lg relative bg-gradient-to-r from-violet-900  via-purple-800 to-fuchsia-700"
        >
        <div
            class="flex items-center justify-between w-full gap-3"
        >
            <div
                class="flex items-center justify-start gap-3"
            >
                <IconsLucide 
                    name="Moon"
                    :class="animateMoon ? 'animate-spin' : ''"
                    class="w-8 h-8"
                    color="silver"
                    :stroke-width="2"
                    @click="handleAnmation"
                />
                <p
                    class="text-xl font-bold text-violet-100"
                >
                    Projeto Lunar
                </p>
            </div>
            <button
                @click="showMenu = !showMenu"
                ref="buttonRef"
            >
                <IconsLucide 
                    name="Menu"
                    class="w-8 h-8"
                    :stroke-width="2"
                    color="silver"
                />
            </button>
        </div>

        <div
            v-if="showMenu"
            ref="menuRef"
            class="flex flex-col items-start justify-start w-3/7 gap-1 absolute bg-white shadow-lg rounded-br-xl rounded-bl-xl right-1 top-16 z-10 p-3"
        >
            <router-link
                to="/"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="Home"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Home
                </p>
            </router-link>

            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="User"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Perfil
                </p>
            </router-link>

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="Layout"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Dashboard
                </p>
            </router-link>

            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="Info"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Sobre
                </p>
            </router-link>
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="Mail"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Contato
                </p>
            </router-link>

            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="Users"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Subgrupos
                </p>
            </router-link>

            
            
            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold "
            >
                <IconsLucide 
                    name="Store"
                    class="w-6 h-6"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Lojinha Lunar
                </p>
            </router-link>

            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-700 hover:bg-green-300/50 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold hover:text-green-900"
            >
                <IconsLucide 
                    :name="isLogged ? 'LogOut' : 'LogIn'"
                    class="w-7 h-7"
                    :color="isLogged ? 'red' : 'green'"
                    :stroke-width="1.5"
                />
                <p
                    :class="isLogged ? 'text-red-600' : 'text-green-600'"
                    class="ml-2"
                >
                    {{ isLogged ? 'Sair' : 'Login' }}
                </p>
            </router-link>

            <router-link
                v-if="!isLogged"
                to="/warning"
                class="flex items-center justify-start w-full text-blue-700 hover:bg-blue-300/50 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold hover:text-blue-900"
            >
                <IconsLucide 
                    name="UserPlus"
                    class="w-7 h-7"
                    color="blue"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Registrar
                </p>
            </router-link>


            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold"
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
  