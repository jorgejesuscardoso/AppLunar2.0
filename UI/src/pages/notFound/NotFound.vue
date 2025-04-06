<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-b from-[#342c6b] to-[#14131e] text-center p-6"
  >
    <!-- Ícone de Erro -->
    <span class="text-7xl">⚠️</span>

    <!-- Mensagem de Erro -->
    <h1 class="text-4xl font-bold mt-4">404 - Página Não Encontrada</h1>
    <p class="text-lg text-gray-300 mt-2 max-w-md">
      Ops! Parece que a página que você tentou acessar não existe ou foi movida.
    </p>

    <!-- Botão para Voltar -->
    <button
      @click="goHome"
      class="mt-6 px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition"
    >
      Voltar para a Página Inicial
    </button>
  </div>
</template>
