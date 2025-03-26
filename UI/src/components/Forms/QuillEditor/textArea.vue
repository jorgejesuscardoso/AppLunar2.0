<script setup>
import { inject, ref, toRaw } from 'vue';

const isDarkMode = inject('isDarkMode');

const content = ref({
  content: '',
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

const handleSubmit = () => {
  const data = {
    content: content.value.content,
  };

  clearEditor();

  console.log(data);
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
          class="flex flex-col items-center justify-center w-full p-2 rounded-tl-lg rounded-tr-lg"
          :class="isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/70'"
        >
          <QuillEditor
          v-model="content.content"
          :value="content.content"
          @input="(value) => content.content = value.target.innerText"
          :options="editor"
        />
        </div>
        <div
          class="flex items-center justify-center w-full p-2  bg-gray-200/70"
          :class="isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/70'"
        >      
          <button
            class="px-3 py-1 mx-2 text-xs lg:text-base font-semibold text-red-700 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
            @click="clearEditor"
            :class="isDarkMode ? 'darkCancelButton' : ''"
          >
            Limpar
          </button>    
          <button
            @click="handleSubmit"
            class="px-3 py-1 mx-2 text-xs lg:text-base font-bold text-green-900 border border-green-700 hover:bg-green-600 hover:text-white rounded-md"
            :class="isDarkMode ? 'darkSendButton' : ''"
          >
            Publicar
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

.darkSendButton {
  border-color: var(--bg-dark-border-send) !important;
}

.darkSendButton:hover {
  background-color: var(--bg-dark-hover-send);
  border-color: var(--bg-dark-hover-send) !important;
  color: var(--text-dark);
}

.darkCancelButton {
  border-color: var(--bg-dark-border-cancel);
}

.darkCancelButton:hover {
  background-color: var(--bg-dark-hover-cancel);
  border-color: var(--bg-dark-hover-cancel);
  color: var(--text-dark);
}

.ql-editor {
  min-height: 100px;
  border: none !important;
}

.ql-container {
  border: none !important;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  color: rgb(41, 41, 40);
  font-family: 'Poppins', sans-serif;
  font-size: 13px !important;
  width: 100%;
  height: 150px !important;

  @media screen and (min-width: 768px) {
    font-size: 16px !important;
    
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