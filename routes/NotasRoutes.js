const express = require('express');
const router = express.Router();
const Nota = require('../models/Nota');

// Crear un ítem
router.post('/', async (req, res) => {
    try {
        const newNota = new Nota(req.body);
        const nota = await newNota.save();
        res.json(nota);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Obtener todos los ítems
router.get('/', async (req, res) => {
    try {
        const Notas = await Nota.find();
        res.json(Notas);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Obtener un ítem por ID
router.get('/:id', async (req, res) => {
    try {
        const Notas = await Nota.findById(req.params.id);
        if (!Notas) {
            return res.status(404).json({ msg: 'Nota not found' });
        }
        res.json(Notas);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Actualizar un ítem
router.put('/:id', async (req, res) => {
    try {
        const Notas = await Nota.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(Notas);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const Notas = await Nota.findById(req.params.id);
        if (!Notas) {
            return res.status(404).json({ msg: 'Nota not foundd' });
        }
        await Notas.deleteOne(); // Corrected line
        res.json({ msg: 'Nota removed' });
    } catch (err) {
        res.status(500).send('Server Errorr');
    }
});



module.exports = router;
