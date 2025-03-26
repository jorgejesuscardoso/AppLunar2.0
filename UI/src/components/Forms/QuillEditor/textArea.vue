<script setup>
import { inject, ref, toRaw } from 'vue';

const isDarkMode = inject('isDarkMode');

const content = ref({
  content: '',
  title: '',
});

const editor = {
    theme: 'snow',
    placeholder: 'Digite aqui...',
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
    title: content.value.title,
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

        <input
          v-model="content.title"
          class="w-full text-sm font-semibold text-start p-1 px-4 absolute top-8 left-0 z-9 bg-white outline-none border border-gray-300"
          placeholder="Digite o título..."
          :class="isDarkMode ? 'darkInput' : ''"
        />
        <QuillEditor
          v-model="content.content"
          :value="content.content"
          @input="(value) => content.content = value.target.innerText"
          :options="editor"
        />
        <div
          class="flex items-center justify-center w-full p-2 absolute bottom-0 bg-gray-100 border-t border-gray-300"
        >      
          <button
            class="px-3 py-1 mx-2 text-xs font-semibold text-red-700 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
            @click="clearEditor"
            :class="isDarkMode ? 'darkCancelButton' : ''"
          >
            Limpar
          </button>    
          <button
            @click="handleSubmit"
            class="px-3 py-1 mx-2 text-xs font-bold text-green-900 border border-green-700 hover:bg-green-600 hover:text-white rounded-md"
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

.darkInput {
  color: #555;
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
}

.ql-container {
  border: 1px solid #ccc;
  border-radius: 0 0 7px 7px;
  background-color: rgb(255, 255, 255);
  color: rgb(41, 41, 40);
  font-family: 'Poppins', sans-serif;
  font-size: 13px !important;
  width: 100%;
  height: 150px !important;
  margin-top: 28px !important;

  @media screen and (min-width: 768px) {
    font-size: 16px !important;
    
  }
}

.ql-toolbar {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
  background-color: rgb(233, 233, 233);
}

</style>