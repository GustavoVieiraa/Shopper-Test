const ReadingService = require('../services/ReadingService');

class ReadingController {
  constructor() {
    this.readingService = new ReadingService();
  }

  async confirmReading(req, res) {
    try {
      const { measure_uuid, confirmed_value } = req.body;

      // Chama o serviço para confirmar a leitura
      const result = await this.readingService.confirmReading(measure_uuid, confirmed_value);

      return res.status(200).json(result);
    } catch (error) {
      if (error.message === 'MEASURE_NOT_FOUND') {
        return res.status(404).json({
          error_code: error.message,
          error_description: 'Leitura não encontrada.',
        });
      }
      if (error.message === 'CONFIRMATION_DUPLICATE') {
        return res.status(409).json({
          error_code: error.message,
          error_description: 'Leitura já confirmada.',
        });
      }
      return res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação.',
      });
    }
  }
}

module.exports = ReadingController;
