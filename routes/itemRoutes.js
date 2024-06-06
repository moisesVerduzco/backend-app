const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Crear un ítem
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Obtener todos los ítems
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Obtener un ítem por ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Actualizar un ítem
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Borrar un ítem
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        await item.remove();
        res.json({ msg: 'Item removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
