const Reading = require('../models/Reading');

class ReadingService {
  async confirmReading(measure_uuid, confirmed_value) {
    const reading = await Reading.findOne({ measure_uuid });
    
    if (!reading) {
      throw new Error('MEASURE_NOT_FOUND');
    }

    if (reading.confirmed) {
      throw new Error('CONFIRMATION_DUPLICATE');
    }

    reading.confirmed_value = confirmed_value;
    reading.confirmed = true;
    await reading.save();

    return { success: true };
  }
}

module.exports = ReadingService;
