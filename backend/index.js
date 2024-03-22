const express = require('express');
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/usuarios', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
