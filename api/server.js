const express = require('express');
const connectDB = require('./config/database');
const uploadRoute = require('./routes/uploadRoute');
const leituraRoutes = require('./routes/leituraRoutes'); 


const app = express();
app.use(express.json({ limit: '10mb' }));

connectDB();

app.use('/api', uploadRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});