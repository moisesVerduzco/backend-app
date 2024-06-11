
const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
   
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe en la base de datos
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
  
      if (password !== user.password) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
  
      // Si las credenciales son válidas, enviar una respuesta exitosa
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });
  
 

module.exports = router;
