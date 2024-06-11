
const express = require('express');
const router = express.Router();

const User_us = require('../models/users_traba');

// Obtener todos los ítems
router.get('/', async (req, res) => {
  try {
      const User = await User_us.find();
      res.json(User);
  } catch (err) {
      res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
      const User = await User_us.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
      );
      res.json(User);
  } catch (err) {
      res.status(500).send('Server Error');
  }
});

router.post('/signup_us', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User_us.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
   
    const newUser = new User_us({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/login_us', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe en la base de datos
      const user = await User_us.findOne({ email });
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

  router.delete('/:id', async (req, res) => {
    try {
        const User = await User_us.findById(req.params.id);
        if (!User) {
            return res.status(404).json({ msg: 'User not foundd' });
        }
        await User.deleteOne(); // Corrected line
        res.json({ msg: 'User removed' });
    } catch (err) {
        res.status(500).send('Server Errorr');
    }
});
  
 

module.exports = router;
