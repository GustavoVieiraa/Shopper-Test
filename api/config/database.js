require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro na conexão com o MongoDB:', error);
    process.exit(1); // Encerra a aplicação em caso de erro
  }
};

module.exports = connectDB;