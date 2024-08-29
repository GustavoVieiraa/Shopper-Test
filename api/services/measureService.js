const Measure = require('../models/Measure');

class MeasureService {
  async listMeasures(customer_code, measure_type) {
    // Validar measure_type
    if (measure_type && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
      throw new Error('INVALID_TYPE');
    }

    // Construir filtro
    const filter = { customer_code };
    if (measure_type) {
      filter.measure_type = measure_type.toUpperCase();
    }

    // Buscar medidas
    const measures = await Measure.find(filter);

    if (measures.length === 0) {
      throw new Error('MEASURES_NOT_FOUND');
    }

    return measures;
  }
}

module.exports = MeasureService;
