const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registrarUsuario = async (req, res) => {
  try {
    const { fullName, email, isCompany, isResident } = req.body;

    const usuario = await prisma.user.create({
      data: {
        fullName,
        email,
        isCompany,
        isResident,
      },
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarUsuario,
  obtenerUsuarioPorId,
};
