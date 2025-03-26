<script setup>
import { testData } from '@/assets/fakeFeed.ts';
import { inject } from 'vue';
import IconsLucide from '@/helpers/IconsLucide.vue';
import { computed } from 'vue';

const isDarkMode = inject('isDarkMode');


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

const handleLike = (index) => {
  let liking = 0;
  let unLiking = 0;

  if (index === 'like') {
    liking += 1;
  } else {
    unLiking += 1;
  }

  console.log('curtiu',liking, 'descurtiu' ,unLiking);
};

</script>

<template>
    <div
        class="flex flex-col items-center justify-center gap-2 min-h-screen min-w-full rounded-lg lg:p-5 p-1"
      >
        <!-- Cards de feed -->
        <div
          v-for="(item, index) in testData"
          :key="index"
          class="flex flex-col w-full items-center justify-start text-neutral-700  shadow-md rounded-lg"
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
                class="flex items-center justify-center rounded-full p-1 bg-gray-400/70"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
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
                class="flex flex-col items-center justify-center w-full rounded-lg"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
                  alt=""
                  class="w-full h-64"
                />
                <div
                  v-if="item.video"
                  class="flex items-center justify-center w-full h-64 bg-gray-400/70 rounded-lg"
                >
                  <iframe
                    :src="formatYouTubeLink(item.video)"
                    frameborder="0"
                    class="w-full h-64 rounded-lg"
                    allow="gyroscope; picture-in-picture; fullscreen"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-between w-full h-10 p-5 border-t border-gray-300/50 rounded-bl-lg rounded-br-lg"
            :class="isDarkMode ? 'bg-gray-500/10' : 'bg-white'"
          >
            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="ThumbsUp"
                class="w-7 h-7 cursor-pointer hover:bg-gray-100/10 rounded-full p-1"
                :color="
                  item.liked 
                    ? (isDarkMode ? 'blue' : 'blue') 
                    : (isDarkMode ? 'white' : 'black')
                "
                :stroke-width="item.liked ? 2 : 1"
                value="like"
                @click="handleLike('like')"
              />
              <span
                class="text-sm"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.likes }}
              </span>
            </div>
            <div
              class="flex items-center justify-center gap-1"
            >
            <IconsLucide
              name="ThumbsDown"
              class="w-7 h-7 cursor-pointer hover:bg-gray-100/10 rounded-full p-1"
              :color="
                !item.liked 
                  ? (isDarkMode ? 'red' : 'red') 
                  : (isDarkMode ? 'white' : 'black')
              "
              :stroke-width="!item.liked ? 2 : 1"
              value="unlike"
              @click="handleLike('unlike')"
            />
              <span
                class="text-sm"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.unlikes }}
              </span>
            </div>
            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="MessageSquareMore"
                class="w-7 h-7 cursor-pointer hover:bg-gray-100/10 rounded-full p-1"
                :color="isDarkMode ? 'white' : 'black'"
                value="comment"
              />
              <span
                class="text-sm"
                :class="isDarkMode ? 'text-white' : 'text-neutral-700'"
              >
                {{ item.comments }}
              </span>
            </div>
            <div
              class="flex items-center justify-center gap-1"
            >
              <IconsLucide
                name="Share"
                class="w-7 h-7 cursor-pointer hover:bg-gray-100/10 rounded-full p-1"
                :color="isDarkMode ? 'white' : 'black'"
                value="share"
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
              class="w-7 h-7 cursor-pointer hover:bg-gray-100/10 rounded-full p-1"
              :color="isDarkMode ? 'white' : 'black'"
              value="more"
            />

          </div>
         
          
        </div>
        
      </div>
</template>