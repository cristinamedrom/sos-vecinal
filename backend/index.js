const express = require('express');
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
const cors = require('cors')

const whitelist = ['http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/passport');

app.use('/api/usuarios', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
