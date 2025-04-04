<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, inject} from 'vue';
import { TUsers } from '@/types/user';
import IconsLucide from '@/helpers/IconsLucide.vue';

const themeInject = inject('isDarkMode') as any;

const isLogged = ref(false);
const erroMessage = ref('');
const successMessage = ref('');
const isAdmin = ref(false);
const isDarkMode = ref(themeInject);
const isLoading = ref(false);

defineProps<{
    user: TUsers;
    isAdmin: boolean;
    isDarkMode: boolean;
    isLogged: boolean;
}>();

onMounted(() => {
});

</script>

<template>
  <div 
    class="flex flex-col items-start justify-start w-full py-5 px-7 rounded-lg shadow-lg border relative transition duration-300 ease-in-out"
    :class="{
        'bg-gray-800 text-gray-200 border-gray-700': isDarkMode,
        'bg-white text-gray-800 border-gray-300 ': !isDarkMode,
    }">
    <!-- Nome -->
    <div class="flex items-start justify-center w-full mb-3">
      <h1 
        class="text-xs font-bold w-full text-start"
        :class="{
            'text-[violet]': isDarkMode,
            'text-blue-800': !isDarkMode,
        }"
    >
        {{ user.name }}
      </h1>
    <IconsLucide
        name="UserCircle"
        class="w-16 h-16 cursor-pointer hover:text-gray-700 absolute right-2 top-2"
        :color="isDarkMode ? '#374151' : '#4B5563'"
      />
    </div>

    <!-- Detalhes do Usuário -->
    <div class="mt-2 gap-1 flex flex-col items-start justify-start w-full">
        <p class="text-xs"><strong >Idade:</strong> {{ user.age }}</p>
        <p class="text-xs"><strong >Usuário:</strong> {{ user.user }}</p>
        <p class="text-xs"><strong >Usuário WTPD:</strong> {{ user.userWtp }}</p>
        <p class="text-xs"><strong >Telefone:</strong> {{ user.phone }}</p>
        <p class="text-xs"><strong >Função:</strong> {{ user.role }}</p>
        <p class="text-xs my-1">
            <strong class="text-xs">
            Status:
            </strong> 
            <span
                class="text-xs font-semibold"
                :class="{
                    'text-green-700 dark:text-green-400': user.status === 'active',
                    'text-yellow-700 dark:text-yellow-400': user.status === 'inactive',
                    'text-red-700 dark:text-red-400': user.status === 'removed' || user.isDeleted || !user.status,
                }"
            >
                {{ user.status === 'active' ? 'Ativo' : user.status === 'removed'? 'Removido' : user.status === 'inactive' ? 'Inativo' : 'Removido' }}
            </span>
        </p>
        <p 
            class="text-xs text-green-700 font-bold my-2"
            :class="{
                'text-green-700 dark:text-green-400': user.points > 0,
                'text-red-700 dark:text-red-400': user.points <= 0,
            }"
        >
            <strong class="text-xs font-semibold">Pontos:</strong> {{ user.points }}
        </p>
        <p class="text-xs font-bold"><strong class="text-xs font-semibold">Qtd. Obras:</strong> {{ user.books.length }}</p>
        <p class="text-xs font-bold">
            <strong class="text-xs font-semibold">
                Subgrupos:
            </strong> 
            <ul
                class="text-xs font-semibold list-disc list-inside"
                v-if="user.subs.length > 0"
            >
                <li v-for="subs in user.subs"> 
                    {{ subs.name }}
                </li>
            </ul>
            <span v-else class="text-xs font-semibold">N/A</span>
        </p>
    </div>

    <!-- Datas -->
    <div class="mt-2 text-xs">
        <p class="text-xs">
            <strong>Cadastrado:</strong> {{ user.createdAt ? new Date(user.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A' }}
        </p>

        <p class="text-xs">
            <strong>Atualizado:</strong> {{ user.updatedAt ? new Date(user.updatedAt).toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A' }}
        </p>
        <p 
            v-if="user.createdBy"
            class="mt-3 font-bold"
            :class="{
                'text-blue-300': isDarkMode,
                'text-blue-800': !isDarkMode,
            }"
        >
            <strong 
                class="font-semibold"
                
            >
                Cadastrado por:
            </strong> {{ user.createdBy}}
        </p>
    </div>
  </div>
</template>
