<script setup lang="ts">
import IconsLucide from '@/helpers/IconsLucide.vue';
import { ref, provide } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const showMenu = ref(false);
const isLogged = ref(false);
const menuRef = ref(null); // Referência para o menu
const buttonRef = ref(null); // Referência para o botão
const menuConfigRef = ref(null); // Referência para o menu de configurações
const menuConfigRefMobile = ref(null); // Referência para o menu de configurações
const menuConfigButtonRef = ref(null); // Referência para o botão de configurações
const animateMoon = ref(false);
const showDiv = ref(false);
const showConfigMenu = ref(false);
const showConfigMenuMobile = ref(false);
const isDarkMode = ref(false);
const fixedLogo = ref(false);

// Provendo a variável isDarkMode
provide('isDarkMode', isDarkMode);

// Função para fechar o menu ao clicar fora dele
const handleClickOutside = (event) => {
  // Certifique-se de que menuRef e buttonRef não são nulos
  if (menuRef.value && buttonRef.value && !menuRef.value.contains(event.target) && !buttonRef.value.contains(event.target)) {
    showMenu.value = false;
  }
};

// Função para fechar o menu de configurações ao clicar fora dele
const handleClickOutsideConfigMenu2 = (event) => {
  // Certifique-se de que menuConfigRef e menuConfigButtonRef não são nulos
  if (menuConfigRefMobile.value && menuConfigButtonRef.value && !menuConfigRefMobile.value.contains(event.target) && !menuConfigButtonRef.value.contains(event.target)) {
    showConfigMenuMobile.value = false;
  }
};

// Função para animar o ícone da lua
const handleAnmation = () => {
    animateMoon.value = !animateMoon.value;
};

// Função para fechar o menu de configurações ao clicar fora dele
const handleClickOutsideConfigMenu = (event) => {
    // Certifique-se de que menuConfigRef e menuConfigButtonRef não são nulos
    if (menuConfigRef.value && menuConfigButtonRef.value && !menuConfigRef.value.contains(event.target) && !menuConfigButtonRef.value.contains(event.target)) {
        showConfigMenu.value = false;
    }
};

// Função para travar o logootipo no topo da página
const handleFixedLogo = () => {
  const navbar = document.querySelector(".main-navbar");
  if (!navbar) return;

  const navbarBottom = navbar.getBoundingClientRect().bottom;

  // Se a navbar sair da tela, ativa o logo fixo
  fixedLogo.value = navbarBottom <= 0;
};

// Adiciona o evento de click fora do menu
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('click', handleClickOutsideConfigMenu);
    document.addEventListener('click', handleClickOutsideConfigMenu2);
    window.addEventListener('scroll', handleFixedLogo);
});

// Remove o evento de click fora do menu
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('click', handleClickOutsideConfigMenu);
    document.removeEventListener('click', handleClickOutsideConfigMenu2);
    window.removeEventListener('scroll', handleFixedLogo);
});


const handleToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<template>
    <div
        class="bg-gray-200 z-50"
    >
        <div
            v-if="fixedLogo"
            class="hidden lg:flex items-center justify-between gap-3 p-3 w-full h-14 mb-4  fixed top-0 left-0 z-50 bg-white shadow-sm shadow-gray-300"
            :class="isDarkMode ? 'dark' : ''"
        >
            <div
                class="flex items-center justify-start gap-3"
            >
                <IconsLucide 
                :name="isDarkMode ? 'Sun' : 'Moon'"
                class="w-10 h-10 p-1 rounded-full cursor-pointer"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-violet-900'"
                @click="isDarkMode = !isDarkMode"
                :color="isDarkMode ? 'violet' : 'silver'"
                :stroke-width="2"

            />
                <p
                    class="text-xl font-bold"
                    :class="isDarkMode ? ' text-violet-500' : 'text-gray-800'"
                >
                    Projeto Lunar
                </p>

                <span
                    class="absolute top-2 left-32 text-[11px] flex items-center font-bold justify-center cursor-pointer"
                    :class="isDarkMode ? 'text-purple-400' : 'text-violet-600'"
                >
                    {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
                </span>
            </div>

            <div
                class="w-9/12"
            >
                <nav
                    class="flex items-center justify-between w-full gap-1"
                >
                    <router-link
                        to="/"
                        class="flex items-center justify-start text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Home
                        </p>
                    </router-link>

                    <router-link
                        to="/warning"
                        class="flex items-center justify-start text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Perfil
                        </p>
                    </router-link>

                    <router-link
                        to="/warning"
                        class="flex items-center justify-start text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Dashboard
                        </p>
                    </router-link>

                    <router-link
                        to="/warning"
                        class="flex items-center justify-start text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Sobre
                        </p>
                    </router-link>
                    
                    <router-link
                        to="/warning"
                        class="flex items-center justify-start text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Contato
                        </p>
                    </router-link>

                    <router-link
                        to="/warning"
                        class="flex items-center justify-start text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Subgrupos
                        </p>
                    </router-link>

                    <router-link
                        to="/warning"
                        class="flex items-center justify-start  text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2 w-full"
                        >
                            Lojinha Lunar
                        </p>
                    </router-link>

                    <router-link
                        to="/warning"
                        class="flex items-center justify-start hover:bg-gray-200/80 hover:text-green-900 rounded-full p-1 px-3 text-sm font-bold "
                        :class="isLogged ? 'text-red-600' : 'text-green-600'"
                    >
                        <p
                            class="ml-2"
                        >
                            {{ isLogged ? 'Sair' : 'Login' }}
                        </p>
                    </router-link>

                    <router-link
                        v-if="!isLogged"
                        to="/warning"
                        class="flex items-center justify-start text-blue-700 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-3 text-sm font-bold "
                    >
                        <p
                            class="ml-2"
                        >
                            Registrar
                        </p>
                    </router-link>

                </nav>
            </div>
        </div>



      <!-- Navbar fixa -->
      <nav
        class="hidden xl:flex md:flex-col justify-start items-center p-4 text-gray-800 md:bg-white md:absolute md:h-[75%] md:w-60 2xl:w-80 md:my-5 md:ml-1 md:rounded-lg md:shadow-md md:shadow-gray-300 md:border md:border-gray-300 relative border-b border-gray-700 shadow-lg bg-white z-50 top-52 main-navbar"

        :class="isDarkMode ? 'dark' : ''"
      >
        <div
            class="flex items-center gap-3 p-3 w-full h-14 mb-4  rounded-2xl relative"
        >
            <IconsLucide 
                :name="isDarkMode ? 'Sun' : 'Moon'"
                class="w-10 h-10 p-1 rounded-full cursor-pointer"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-violet-900'"
                @click="isDarkMode = !isDarkMode"
                :color="isDarkMode ? 'violet' : 'silver'"
                :stroke-width="2"

            />
            <p
                class="text-xl font-bold"
                :class="isDarkMode ? ' text-violet-500' : 'text-gray-800'"
            >
                Projeto Lunar
            </p>

            <span
                class="absolute top-12 left-0 text-[10px] flex items-center font-bold justify-center cursor-pointer"
                :class="isDarkMode ? 'text-purple-400' : 'text-violet-600'"
            >
                {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
            </span>
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
                class="flex items-center justify-start w-full text-emerald-700 hover:bg-green-100/50 hover:text-green-950 rounded-full p-1 px-3  font-bold login"
            >
                <IconsLucide 
                    :name="isLogged ? 'LogOut' : 'LogIn'"
                    :stroke-width="2"
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
                class="flex items-center justify-start w-full text-[#000077] hover:bg-blue-300/50 hover:text-[#0000ff] rounded-full p-1 px-3 font-bold register"
            >
                <IconsLucide 
                    name="UserPlus"
                    :stroke-width="2"
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
                ref="menuConfigButtonRef"
                @click="showConfigMenu = !showConfigMenu"
                class="flex items-center justify-start w-11/12 text-gray-800 hover:bg-gray-300/80 hover:text-gray-900 p-2 h-10 px-3 md:absolute md:bottom-0 md:mb-3 font-bold cursor-pointer rounded-2xl"
            >
                <IconsLucide 
                    name="Settings"
                    class="w-7 h-7"
                    :color="isDarkMode ? 'white' : 'black'"
                    :stroke-width="1.5"
                />
                <p
                    class="ml-2"
                >
                    Configurações
                </p>
            </div>

            <!-- Float Menu de configurações versão para pc -->
            <div
                ref="menuConfigRef"
                v-if="showConfigMenu"
                class="flex flex-col items-start justify-start absolute w-10/12 gap-1 bg-white shadow-lg rounded-xl ml-1 left-[100%] top-0 z-10 p-3"
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
                <button
                    
                    class="flex w-full items-center justify-start text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl p-2 px-3 text-sm font-bold"
                    @click="isDarkMode = !isDarkMode"   
                >
                    <IconsLucide 
                        :name="isDarkMode ? 'Sun' : 'Moon'"
                        class="w-6 h-6"
                        :stroke-width="1.5"
                    />
                    <p class="ml-2">
                        {{ isDarkMode ? 'Desativar Modo Escuro' : 'Ativar Modo Escuro' }}
                    </p>
                </button>

                </div>
            </div>
        </div>
      </nav>

      <nav
        class="lg:hidden fixed flex justify-between items-center p-4 text-gray-800 bg-white shadow-lg  z-10 w-full "
        :class="isDarkMode ? 'dark nav-mobile' : 'bg-gradient-to-r from-violet-900  via-purple-800 to-fuchsia-700'"
    >
        <div
            class="flex items-center justify-between w-full gap-3 relative"
        >
            <div
                class="flex items-center justify-start gap-3"
            >
                <IconsLucide 
                    :name="isDarkMode ? 'Sun' : 'Moon'"
                    class="w-8 h-8"
                    :color="isDarkMode ? 'violet' : 'silver'"
                    :stroke-width="2"
                    @click="isDarkMode = !isDarkMode"
                />
                <p
                    class="text-xl font-bold text-violet-100"
                >
                    Projeto Lunar
                </p>
                
                <span
                    class="absolute top-7 py-1 left-0 text-[9px] font-bol  flex items-center justify-center cursor-pointer"
                    :class="isDarkMode ? 'text-violet-400' : 'text-gray-200'"
                >
                    {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
                </span>
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


            <button
                ref="menuConfigButtonRef"
                class="flex items-center justify-start w-full text-gray-800 hover:bg-gray-200/80 hover:text-gray-900 rounded-full p-1 px-2 text-sm font-bold"
                @click="showConfigMenuMobile = !showConfigMenuMobile"
            >
                <IconsLucide 
                    name="Settings"
                    class="w-7 h-7"
                    :color="isDarkMode ? 'white' : 'black'"
                    :strokeWidth="1.5"
                />
                <p
                    class="ml-2"
                >
                    Configurações
                </p>
            </button>
        </div>

        <!-- Float Menu de configurações -->
        <div
            ref="menuConfigRefMobile"
            v-if="showConfigMenuMobile"
            class="flex flex-col items-start justify-start w-1/2 gap-1 absolute bg-white shadow-lg rounded-xl left-0 top-16 z-10 p-3 border border-gray-300"
        >

            <div
                class="flex flex-col items-start justify-start w-full gap-1"
            >
                <button
                    class="flex w-full items-center justify-start text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl p-2 px-3 text-sm font-bold btn-dark-floating"
                    @click="isDarkMode = !isDarkMode"   
                >
                    <IconsLucide 
                        :name="isDarkMode ? 'Moon' : 'Sun'"
                        class="w-6 h-6"
                        :stroke-width="1.5"
                    />
                    <p class="ml-2">
                        {{ isDarkMode ? 'Modo Escuro' : 'Modo Claro' }}
                    </p>
                </button>

            </div>

        </div>
      </nav>

      <div>
        <IconsLucide
            name="ArrowUp"
            class="fixed bottom-5 right-5 w-10 h-10 p-2  rounded-full shadow-xl cursor-pointer shadow-black/40"
            :class="isDarkMode ? 'bg-gray-900' : 'bg-white'"
            :stroke-width="2"
            @click="handleToTop"
            :color="isDarkMode ? 'violet' : 'purple'"
        />
      </div>
  
      <!-- Conteúdo da rota muda aqui -->
      <main>
        <router-view />
      </main>
    </div>
  </template>

<style scoped>

.dark {
    background-color: var(--bg-dark);
    color: var(--text-dark);
    box-shadow: var(--shadow-theme-dark);
    border: var(--border-dark);
}

.nav-mobile {
    background-color: var(--bg-dark);
    color: var(--text-dark);
    box-shadow: var(--shadow-theme-dark);
    border-bottom: 1px solid rgb(26, 25, 25) !important;
}

.dark .bg-white {
    background-color: var(--bg-dark);
    box-shadow: var(--shadow-theme-dark);
    border: var(--border-dark);
}

.dark .text-gray-800 {
    color: var(--text-dark)
}

.dark .text-gray-800:hover {
    color: var(--text-dark-hover)
}

.dark .text-gray-700 {
    color: var(--text-dark)
}

.dark .text-gray-700:hover {
    color: var(--text-dark-hover)
}


.dark .register {
    color: dodgerblue;
}

.dark .register:hover {
    color: rgb(0, 0, 255);
}

.dark .login {
    color: green;
}

.dark .login:hover {
    color: #30ff37;
}

.dark .btn-dark-floating {
    color: var(--text-dark) !important;
    background-color: var(--bg-dark-2);
    border: 1px solid;
    border-color: var(--text-dark) !important;
}

</style>

  