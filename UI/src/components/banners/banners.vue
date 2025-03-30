<script setup>
</script>

<template>
    <header
        class="flex flex-col items-center justify-start w-full bg-red-900 text-white"
    >
        <div
            class="flex flex-col items-center justify-center w-full h-full relative "
        >
            <img 
                src="/oficial-img.jpg"
                alt="banner"
                class="w-full h-52 object-cover md:h-52"
            >
            <div class="absolute top-0 left-0 w-full h-full bg-black/50">
            <span>
                <h1
                    class="absolute xl:text-4xl text-2xl top-1/2 font-bold text-center text-white xl:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
                    style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);"
                >
                    Bem-vindo ao AppLunar 2.0
                </h1>
                <p
                    class="absolute text-lg text-center text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10 w-full "
                    style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);"
                >
                    O aplicativo do projeto onde a Lua Ilumina os livros.
                </p>
            </span>
            </div>
        </div>
    </header>
</template>