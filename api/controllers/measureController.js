const MeasureService = require('../services/MeasureService');

class MeasureController {
  constructor() {
    this.measureService = new MeasureService();
  }

  async listMeasures(req, res) {
    try {
      const { customer_code } = req.params;
      const { measure_type } = req.query;

      // Chama o serviço para listar medidas
      const measures = await this.measureService.listMeasures(customer_code, measure_type);

      return res.status(200).json({
        customer_code,
        measures: measures.map(measure => ({
          measure_uuid: measure.measure_uuid,
          measure_datetime: measure.measure_datetime,
          measure_type: measure.measure_type,
          has_confirmed: measure.has_confirmed,
          image_url: measure.image_url,
        })),
      });
    } catch (error) {
      if (error.message === 'INVALID_TYPE') {
        return res.status(400).json({
          error_code: error.message,
          error_description: 'Tipo de medição não permitida.',
        });
      }
      if (error.message === 'MEASURES_NOT_FOUND') {
        return res.status(404).json({
          error_code: error.message,
          error_description: 'Nenhuma leitura encontrada.',
        });
      }
      return res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação.',
      });
    }
  }
}

module.exports = MeasureController;
