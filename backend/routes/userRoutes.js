const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/registro', userController.registrarUsuario);
router.get('/:id', userController.obtenerUsuarioPorId);

module.exports = router;
