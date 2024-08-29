const mongoose = require('mongoose');

const leituraSchema = new mongoose.Schema({
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ['WATER', 'GAS'], required: true },
  measure_value: { type: Number },
  image_url: { type: String },
  measure_uuid: { type: String, unique: true, required: true }
});

const Leitura = mongoose.model('Leitura', leituraSchema);

module.exports = Leitura;