const axios = require("axios");
const testData = require("./mockFeed.ts");

const API_URL = "http://localhost:3000/dev/posts"; // Substitua pelo endpoint correto

async function createTestPosts() {
  for (const post of testData) {
    try {
      const response = await axios.post(API_URL, post);

      console.log("🟢 Resposta da API:", response.data); // DEBUG: Mostra a resposta completa

      if (!response.data || !response.data.post || !response.data.post.postId) {
        throw new Error("Resposta inválida da API");
      }

      console.log(`✅ Post criado: ${response.data.post.postId}`);
    } catch (error) {
      console.error(`❌ Erro ao criar post: ${error.message}`);
      if (error.response) {
        console.error("🔴 Detalhes do erro:", error.response.data); // DEBUG: Mostra o erro da API
      }
    }
  }
}

createTestPosts();
