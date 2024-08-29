const Leitura = require('../models/leitura');

class LeituraRepository {
  async findByTipoLeituraAndMesAno(tipoLeitura, mesAno) {
    return await Leitura.findOne({ tipoLeitura, mesAno });
  }

  async create(leituraData) {
    const leitura = new Leitura(leituraData);
    return await leitura.save();
  }
}

module.exports = LeituraRepository;
