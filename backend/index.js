const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../credentials/sos-vecinal-bd10b-firebase-adminsdk-m81ws-79307198f7.json');
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { userRef } = require('./firestoreConfig');

const app = express();

app.use(express.json());

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

app.use('/api/usuarios', userRoutes);

app.post('/api/registro', async (req, res) => {
  const { fullName, email, password, isCompany, isResident } = req.body;

  try {
    await userRef.add({
      fullName: fullName,
      email: email,
      password: password,
      isCompany: isCompany,
      isResident: isResident
    });

    console.log('Usuario registrado en Firestore');
    res.status(200).send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario en Firestore:', error);
    res.status(500).send({ error: 'Error al registrar usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
