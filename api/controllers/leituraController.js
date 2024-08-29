// Importar o serviço GeminiService
const GeminiService = require('../services/geminiService');
const path = require('path');

// Supondo que você já tenha uma instância do express
const express = require('express');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validar os parâmetros recebidos
    if (!image || !customer_code || !measure_datetime || !measure_type) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Todos os campos são obrigatórios.'
      });
    }

    // Instanciar o serviço Gemini
    const geminiService = new GeminiService(process.env.GOOGLE_API_KEY);

    // Supondo que a imagem seja enviada como um caminho (se não for, você pode salvar a imagem recebida como base64 em um arquivo temporário)
    const imagePath = path.join(__dirname, '../uploads', 'image.jpg');
    
    // Processar a imagem a partir do arquivo
    const measure_value = await geminiService.processImageFromFile(imagePath);

    // Responder com os dados
    res.status(200).json({
      image_url: 'http://example.com/path/to/image',  // Aqui você pode colocar a URL da imagem, se estiver salvando em algum serviço de armazenamento
      measure_value: measure_value,
      measure_uuid: 'generated-uuid'  // Aqui você deve gerar um UUID para a leitura
    });
  } catch (error) {
    console.error('Erro ao processar a leitura:', error.message);
    res.status(500).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'Erro ao processar a leitura.'
    });
  }
});

module.exports = router;