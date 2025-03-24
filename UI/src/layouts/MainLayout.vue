<script setup lang="ts">
import IconsLucide from '@/helpers/IconsLucide.vue';
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const showMenu = ref(false);
const isLogged = ref(false);
const menuRef = ref(null); // Referência para o menu
const buttonRef = ref(null); // Referência para o botão

// Função para fechar o menu ao clicar fora dele
const handleClickOutside  = (event) => {
  if (!menuRef.value.contains(event.target) && !buttonRef.value.contains(event.target)) {
    showMenu.value = false;
  }
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
        class="hidden md:flex md:flex-col justify-start items-center p-4 text-gray-800 md:bg-white md:absolute md:h-[95%] md:w-60 md:my-5 md:ml-1 md:rounded-2xl md:shadow-md md:shadow-gray-300 md:border md:border-gray-300 relative border-b border-gray-700 shadow-lg bg-white"
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
            class="flex md:flex-col items-start justify-start w-full rounded-2xl gap-1"
        >
            <router-link
                to="/"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm "
            >
                <IconsLucide 
                    :name="isLogged ? 'LogOut' : 'LogIn'"
                    class="w-7 h-7"
                    color="black"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm "
            >
                <IconsLucide 
                    name="UserPlus"
                    class="w-7 h-7"
                    color="black"
                />
                <p
                    class="ml-2"
                >
                    Registrar
                </p>
            </router-link>


            <router-link
                to="/warning"
                class="flex items-center justify-start w-10/12 text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-3 text-sm md:absolute md:bottom-0 md:mb-10"
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
                ref="buttonRef"
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
            ref="menuRef"
            class="flex flex-col items-start justify-start w-3/7 gap-1 absolute bg-white shadow-lg rounded-xl right-1 top-14 z-10 p-3"
        >
            <router-link
                to="/"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm "
            >
                <IconsLucide 
                    :name="isLogged ? 'LogOut' : 'LogIn'"
                    class="w-7 h-7"
                    color="black"
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
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm "
            >
                <IconsLucide 
                    name="UserPlus"
                    class="w-7 h-7"
                    color="black"
                />
                <p
                    class="ml-2"
                >
                    Registrar
                </p>
            </router-link>


            <router-link
                to="/warning"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-300 hover:text-gray-900 rounded-full p-1 px-2 text-sm"
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
  