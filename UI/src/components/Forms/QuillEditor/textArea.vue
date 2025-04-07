<script setup>
import { inject, ref, toRaw } from 'vue';
import { CreatePostApi } from '@/API/postagensApi';
import IconsLucide from '@/helpers/IconsLucide.vue';

const isDarkMode = inject('isDarkMode');
const emit =defineEmits(['refresh']);
const isLoading = ref(false);

const content = ref({
  content: '',
  image: '',
  video: '',
});

const editor = {
    theme: 'snow',
    placeholder: 'Escreva algo...',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'], 
            [{ list: 'bullet' }],
        ],
    },
};

const clearEditor = () => {
  content.value.title = '';

  document.querySelector('.ql-editor').innerHTML = '';
};

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const user = JSON.parse(localStorage.getItem('user'));
    const post = {
      content: content.value.content,
      username: user.userWtp,
      userWtp: user.userWtp,
      image: content.value.image,
      video: content.value.video,
    };

    const posts = await CreatePostApi(post);
    
    if (posts) {
      emit('refresh');
      clearEditor();
      isLoading.value = false;
      return;
    } else {
      isLoading.value = false;
      console.error('Failed to create post:', posts);
    }
    isLoading.value = false;
    return;
  } catch (error) {
    isLoading.value = false;
    console.error('Error submitting content:', error);    
  }
};

</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full mx-auto"
  >
    <div
      class="flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto"
    >
      <div
        class="relative flex flex-col items-center justify-center w-full my-4"
      >
        <div
          class="flex flex-col items-center justify-center w-full p-2 rounded-tl-lg rounded-tr-lg border-t border-x border-gray-300"
          :class="isDarkMode ? 'bg-gray-600/30 border-none' : 'bg-white'"
        >
          <QuillEditor
            v-model="content.content"
            :value="content.content"
            @input="(value) => content.content = value.target.innerText"
            :options="editor"
          />
        </div>
        <div
          class="flex items-center justify-between w-full p-2  bg-gray-200/70 rounded-bl-lg rounded-br-lg border-b border-x border-gray-300"
          :class="isDarkMode ? 'bg-gray-600/30 border-none' : 'bg-white'"
        >      
          <button
            class="px-3 mx-2 text-xs"
            @click="clearEditor"
            :class="isDarkMode ? 'darkCancelButton' : ''"
          >
            <IconsLucide
              name="Trash2"
              class="w-6 h-6 text-red-600"
            />
          </button>    
          <button
            @click="handleSubmit"
            class="px-3 mx-2 text-xs  font-bold text-green-900 rounded-md"
            :class="isDarkMode ? 'darkSendButton' : ''"
          >
            <IconsLucide
              name="Send"
              class="w-6 h-6"
              :color="isDarkMode ? 'white' : 'black'"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.dark {
  color: var(--text-dark);
}

.dkEditor {
  background-color: black !important;
}

.darkSendButton {
  border-color: var(--dark-mode-btn-border) !important;
  color: var(--text-dark-send) !important;
}


.ql-editor {
  min-height: 100px;
  border: none !important;
}

.ql-container {
  border: none !important;
  border-radius: 10px;
  background-color: rgb(231, 231, 231);
  color: rgb(41, 41, 40);
  font-family: 'Poppins', sans-serif;
  font-size: 12px !important;
  width: 100%;
  height: 150px !important;

  @media screen and (min-width: 768px) {
    font-size: 14px !important;
    
  }
}

.ql-toolbar {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 35px;
  border: none !important;
}

</style>