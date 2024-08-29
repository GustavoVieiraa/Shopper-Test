const Leitura = require('../models/leitura');

class LeituraService {
  constructor(geminiService) {
    this.geminiService = geminiService;
  }

  async verificarLeituraExistente(customer_code, measure_type, measure_datetime) {
    const startOfMonth = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1);
    const endOfMonth = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 0);

    return await Leitura.findOne({
      customer_code,
      measure_type,
      measure_datetime: { $gte: startOfMonth, $lte: endOfMonth }
    });
  }

  async criarLeitura(data) {
    const leitura = new Leitura(data);
    return await leitura.save();
  }

  async processarImagem(imageBase64) {
    return this.geminiService.processImage(imageBase64);
  }
}

module.exports = LeituraService;
