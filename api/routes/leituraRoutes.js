const express = require('express');
const GeminiService = require('../services/geminiService'); // Certifique-se de ajustar o caminho para o seu serviço
const router = express.Router();

// Instância do GeminiService com a chave da API
const geminiService = new GeminiService(process.env.API_KEY);

// Endpoint POST /upload
router.post('/upload', async (req, res) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  try {
    // Validar os dados recebidos
    if (!image || !customer_code || !measure_datetime || !measure_type) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Todos os campos são obrigatórios."
      });
    }

    // Processar a imagem com a IA do Gemini
    const measure_value = await geminiService.processImage(image);

    // Aqui você pode gerar um GUID, salvar no MongoDB, etc.
    const measure_uuid = 'generated-uuid'; // Exemplo de UUID gerado
    const image_url = 'http://example.com/path/to/image'; // Exemplo de URL gerado

    // Responder com o resultado da leitura
    return res.status(200).json({
      image_url,
      measure_value,
      measure_uuid
    });
  } catch (error) {
    console.error('Erro ao processar a leitura:', error.message);
    return res.status(500).json({
      error: 'Erro ao processar a leitura.'
    });
  }
});

module.exports = router;