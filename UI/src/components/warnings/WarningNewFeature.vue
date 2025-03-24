<script setup>
import IconsLucide from '@/helpers/IconsLucide.vue';
</script>

<template>
  <div
    class="
      min-w-screen
      min-h-screen
      bg-gray-900
      flex
      items-center
      justify-center
      text-center
      text-white
      font-bold
      space-y-4
      p-4

      lg:p-0
    "
  >
    <div>
      <div
        class="flex items-center justify-center"
      >
        <div
          class="flex items-center justify-center relative"
        >
          <span
            class="bg-green-500 text-white rounded-full p-2 mr-2"
          ></span>
          <span
            class="bg-green-500 text-white rounded-full p-2 mr-2 animate-ping absolute top-0 right-0"
          ></span>
        </div>

        <h1
          class="text-4xl text-2xl"
        >
          🚧 Em Construção 🚧
        </h1>

        <div
            class="flex items-center justify-center relative"
          >
            <span
              class="bg-green-500 text-white rounded-full p-2 ml-2"
            ></span>
            <span
              class="bg-green-500 text-white rounded-full p-2 animate-ping absolute top-0 right-0"
            ></span>
          </div>
      </div>
      <p class="text-lg mt-4 text-gray-200 text-center">
        Estamos preparando algo grandioso! 🚀
      </p>
      <h2
        class="text-2xl mt-4"
      >
        AGUARDE! 🕒
      </h2>
      <p 
        class="text-base mt-4 text-gray-400 text-center"
      >
        A nova versão está chegando com muitas novidades e melhorias! Fique de olho, você não vai querer perder! 🔥
      </p>

      <p class="text-xl text-gray-300 mt-4">
        Ansioso? Nós também estamos! 😎
      </p>

      <div class="mt-4">
        <span class="text-sm text-gray-500">Voltar à página inicial?</span>
        <button 
          class="ml-2 text-blue-500 hover:underline"
          @click="$router.push('/')"
        >
          Clique aqui
        </button>
      </div>
      
      <div
        class="flex items-center justify-between mt-4 p-1 xl:w-1/2 mx-auto"
      >
        <IconsLucide name="Construction" color="white" :size="32" />
        <span
          class="text-xs text-gray-400 mt-2"
        >
          Botão acima não funciona. Está ai apenas por pura estética. Esse texto também.
          <span
            class="text-xs text-gray-400 mt-2"
          >
            Mentira, funciona sim! 😂
          </span>
        </span>
        <IconsLucide name="Construction" color="white" :size="32" />
      </div>
    </div>
  </div>
</template>
