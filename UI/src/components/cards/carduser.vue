<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted} from 'vue';
import { TUsers } from '@/types/user';

const isLogged = ref(false);
const erroMessage = ref('');
const successMessage = ref('');
const isAdmin = ref(false);
const isDarkMode = ref(false);
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
  <div class="flex flex-col items-start justify-center w-full p-2 px-3 bg-white rounded-lg shadow-md">
    <!-- Nome -->
    <div class="flex items-start justify-center w-full">
      <h1 class="text-md font-bold text-gray-800 w-full text-start">
        {{ user.name }}
      </h1>
    </div>

    <!-- Detalhes do Usuário -->
    <div class="text-gray-600 font-semibold mt-2">
      <p class="text-xs"><strong class="text-sm">Idade:</strong> {{ user.age }}</p>
      <p class="text-xs"><strong class="text-sm">Telefone:</strong> {{ user.phone }}</p>
      <p class="text-xs"><strong class="text-sm">Função:</strong> {{ user.role }}</p>
      <p class="text-xs">
        <strong class="text-sm">
           Status:
        </strong> 
        <span
            class="text-sm font-semibold"
            :class="{
                'text-green-700': user.status === 'active',
                'text-red-700': user.isDeleted,
                'text-yellow-700': user.status !== 'active' && !user.isDeleted
            }"
        >
            {{ user.status === 'active' ? 'Ativo' : user.isDeleted ? 'Removido' : 'Inativo' }}
        </span>
    </p>
      <p class="text-xs text-green-700 font-bold mt- 1"><strong class="text-sm">Pontos:</strong> {{ user.points }}</p>
    </div>

    <!-- Datas -->
    <div class="mt-2 text-xs text-gray-700 font-semibold">
        <p class="text-xs">
            <strong>Criado em:</strong> {{ user.createdAt ? new Date(user.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A' }}
        </p>

        <p class="text-xs">
            <strong>Atualizado em:</strong> {{ user.updatedAt ? new Date(user.updatedAt).toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A' }}
        </p>
        <p class="mt-3 text-blue-800 font-bold"><strong class="text-gray-700 font-semibold">Cadastrado por:</strong> {{ user.createdBy ? user.createdBy : user.userWtp }}</p>
    </div>
  </div>
</template>
