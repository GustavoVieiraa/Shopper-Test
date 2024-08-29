const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  // Método para processar a imagem através de um caminho de arquivo
  async processImageFromFile(imagePath) {
    try {
      // Carregar o arquivo de imagem
      const image = fs.readFileSync(imagePath);

      // Converter para base64
      const base64Image = image.toString('base64');

      // Adicionar o prefixo data URI
      const base64String = `data:image/jpeg;base64,${base64Image}`;

      // Chamar o método para processar a imagem base64
      const result = await this.processImage(base64String);

      return result;
    } catch (error) {
      console.error('Erro ao processar imagem com Gemini:', error.message);
      throw new Error('Erro ao processar imagem com Gemini: ' + error.message);
    }
  }

  // Método para processar a imagem base64 diretamente
  async processImage(imageBase64) {
    try {
      // Remover o prefixo "data:image/jpeg;base64," se existir
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const result = await this.model.generateContent([
        "What numbers are in this photo?",
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg', // Certifique-se de usar o tipo MIME correto
          },
        },
      ]);

      return result.response.text();
    } catch (error) {
      console.error('Erro ao processar imagem com Gemini:', error.message);
      throw new Error('Erro ao processar imagem com Gemini: ' + error.message);
    }
  }
}

module.exports = GeminiService;
