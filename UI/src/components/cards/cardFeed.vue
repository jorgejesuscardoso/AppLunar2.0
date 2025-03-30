<script setup>
import { inject } from 'vue';
import IconsLucide from '@/helpers/IconsLucide.vue';
import { computed, onMounted,ref } from 'vue';
import { GetPostagens } from '@/API/postagensApi';
import { GetLocalStrorage } from '@/helpers/localStorage';
import loading from '@/components/base/LoadingComponent.vue';

const isDarkMode = inject('isDarkMode');
const isLoading = ref(true);

const data = ref([]);
const isNotLogged = ref(false);

const formatYouTubeLink = (url) => {
  if (!url) return '';

  // Verifica se o link já está no formato correto
  if (url.includes('youtube.com/embed/')) return url;

  // Extrai o ID do vídeo
  let videoId = '';
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);

  if (match && match[1]) {
    videoId = match[1];
  } else {
    return ''; // Retorna string vazia se não for um link válido
  }

  // Retorna a URL no formato embed
  return `https://www.youtube.com/embed/${videoId}`;
};

const handleLike = (item, value) => {
  if (GetLocalStrorage('user') === false || GetLocalStrorage('user') === null) {
    isNotLogged.value = true;
    setTimeout(() => {
      isNotLogged.value = false;
    }, 2000);
    return;
  }
  if (value === 'like') {
    if (item.liked) {
      // Se já está curtido, remove o like
      item.liked = false;
      item.likes--;
    } else {
      // Se não está curtido, adiciona o like e remove o dislike se necessário
      item.liked = true;
      item.likes++;

      if (item.disliked) {
        item.disliked = false;
        item.dislikes--;
      }
    }
  } else {
    if (item.disliked) {
      // Se já está descurtido, remove o dislike
      item.disliked = false;
      item.dislikes--;
    } else {
      // Se não está descurtido, adiciona o dislike e remove o like se necessário
      item.disliked = true;
      item.dislikes++;

      if (item.liked) {
        item.liked = false;
        item.likes--;
      }
    }
  }
};



 const handleGetFeed = async () => {
  try {
    const dataFeed = await GetPostagens();
    data.value = dataFeed.data;
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
  }
};

onMounted(async () => {
  isLoading.value = true;
  await handleGetFeed();
  isLoading.value = false;
});

</script>

<template>
  <loading v-if="!data.values || isLoading" />
    <div
        class="flex flex-col items-center justify-center gap-2 min-h-full min-w-full rounded-lg p-1 relative"
      >
        <!-- Cards de feed -->
        <div
          v-for="item in data"
          :key="item.postId"
          class="flex flex-col w-full items-center justify-start text-neutral-700  shadow-2xl rounded-lg  border-gray-300 relative"
          :class="isDarkMode ? 'border-none' : 'border'"
        >
          <div
            class="flex flex-col w-full justify-start lg:p-5 text-neutral-700 gap-5 rounded-tl-lg rounded-tr-lg p-1 py-2"
            :class="isDarkMode ? 'bg-gray-500/10' : 'bg-white'"
          >
            <div
              class="flex items-center justify-between"
            >
              <h3
                class="flex justify-center items-center gap-3 text-lg font-bold md:text-xl"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                <span
                  class="flex items-center justify-center rounded-full p-1 "
                  :class="isDarkMode ? 'text-white bg-gray-700/70' : 'text-neutral-700 bg-zinc-300'"
                >
                  <IconsLucide name="User" class="w-7 h-7" color="black"/>
                </span>
                {{ item.username }}
              </h3>

              <span
                class="text-sm "
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
              </span>

            </div>
            <div
              class="flex flex-col items-start justify-start w-full lg:p-5 min-h-24 rounded-lg shadow-md"
            >
              <p
                class="text-sm  md:text-lg p-1"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.content }}
              </p>
              <div
                class="flex flex-col items-center justify-center w-full rounded-lg gap-2"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
                  alt=""
                  class="w-full h-64"
                />
                <div
                  v-if="item.video"
                  class="flex items-center justify-center w-full h-64 bg-gray-400/70"
                >
                  <iframe
                    :src="formatYouTubeLink(item.video)"
                    frameborder="0"
                    class="w-full h-64 "
                    allow="gyroscope; picture-in-picture; fullscreen; accelerometer; encrypted-media"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-between w-full h-10 md:h-12 p-5 border-t border-gray-300/50 rounded-bl-lg rounded-br-lg"
            :class="isDarkMode ? 'bg-gray-500/10' : 'bg-white'"
          >
            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="ThumbsUp"
                class="w-7 h-7 cursor-pointer rounded-full p-1 md:p-2 md:w-10 md:h-10"
                :color="item.liked ? 'blue' : (isDarkMode ? 'white' : 'black')"
                :stroke-width="item.liked ? 2 : 1"
                :class="isDarkMode ? 'hover:bg-gray-100/10' : 'hover:bg-gray-950/10'"
                @click="handleLike(item, 'like')"
              />
              <span class="text-sm" :class="isDarkMode ? 'text-white' : 'text-neutral-700'">
                {{ item.likes }}
              </span>
            </div>

            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="ThumbsDown"
                class="w-7 h-7 cursor-pointer rounded-full p-1 md:p-2 md:w-10 md:h-10"
                :color="item.disliked ? 'red' : (isDarkMode ? 'white' : 'black')"
                :stroke-width="item.disliked ? 2 : 1"
                :class="isDarkMode ? 'hover:bg-gray-100/10' : 'hover:bg-gray-950/10'"
                @click="handleLike(item, 'dislike')"
              />
              <span class="text-sm" :class="isDarkMode ? 'text-white' : 'text-neutral-700'">
                {{ item.dislikes }}
              </span>
            </div>

            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="MessageSquareMore"
                class="w-7 h-7 cursor-pointer rounded-full p-1 md:p-2 md:w-10 md:h-10"
                :color="isDarkMode ? 'white' : 'black'"
                value="comment"
                :class="isDarkMode ? 'hover:bg-gray-100/10' : 'hover:bg-gray-950/10'"
              />
              <span
                class="text-sm"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.comments.length }}
              </span>
            </div>
            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="Share2"
                class="w-7 h-7 cursor-pointer rounded-full p-1 md:p-2 md:w-10 md:h-10"
                :color="isDarkMode ? 'white' : 'black'"
                value="share"
                :class="isDarkMode ? 'hover:bg-gray-100/10' : 'hover:bg-gray-950/10'"
              />
              <span
                class="text-sm"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.shares }} 
              </span>
            </div>

            <IconsLucide
              name="MoreHorizontal"
              class="w-7 h-7 cursor-pointer rounded-full p-1 md:p-2 md:w-10 md:h-10"
              :color="isDarkMode ? 'white' : 'black'"
              value="more"
              :class="isDarkMode ? 'hover:bg-gray-100/10' : 'hover:bg-gray-950/10'"
            />
          </div>
        </div>
        
      </div>  
      <span
        v-if="isNotLogged"
        class="flex items-center justify-center text-center w-full h-1/4 fixed top-[40%] p-5 text-base text-white z-100"
        :class="isDarkMode ? 'bg-gray-100/10' : 'bg-black/70'"
      >
        Faça login para curtir, comentar e compartilhar
      </span>
</template>