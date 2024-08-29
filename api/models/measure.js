const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
  customer_code: { type: String, required: true },
  measure_uuid: { type: String, required: true, unique: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String, required: true },
});

const Measure = mongoose.model('Measure', measureSchema);
module.exports = Measure;