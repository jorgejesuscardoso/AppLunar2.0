<script setup>

const changeColor = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'indigo', 'teal', 'cyan', 'gray', 'black', 'white'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.documentElement.style.setProperty('--primary-color', randomColor);
}
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

        <h1 class="text-4xl">🚧 Em Construção 🚧</h1>

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
      <p class="text-xl">
        Este recurso ainda está sendo desenvolvido. Volte logo mais para ver a novidade!
      </p>
      <p class="text-lg text-gray-400 mt-2">
        Estamos trabalhando para te entregar a melhor experiência.
      </p>
      <div class="mt-4">
        <span class="text-sm text-gray-500">Voltar à página inicial?</span>
        <button 
          class="ml-2 text-blue-500 hover:underline"
        >
          Clique aqui
        </button>
      </div>
      <span
        class="text-xs text-gray-400 mt-2"
      >
        Botão acima não funciona. Está apenas por estética. Esse texto também.
      </span>
    </div>
  </div>
</template>
