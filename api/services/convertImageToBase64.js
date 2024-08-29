const fs = require('fs');
const path = require('path');

// Função para converter imagem para base64
function convertImageToBase64(imagePath) {
  const image = fs.readFileSync(imagePath);
  return `data:image/png;base64,${image.toString('base64')}`;
}

// Caminho da imagem
const imagePath = path.join(__dirname, '../image/teste.jpg'); // Altere o nome do arquivo conforme necessário

// Converter e exibir base64
const base64Image = convertImageToBase64(imagePath);
console.log(base64Image);