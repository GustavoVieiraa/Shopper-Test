const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  measure_uuid: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  confirmed: { type: Boolean, default: false },
  confirmed_value: { type: Number, default: null },
});

const Reading = mongoose.model('Reading', readingSchema);
module.exports = Reading;
