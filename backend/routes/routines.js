const express = require('express');
const Routine = require('../models/Routine');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtener todas las rutinas del usuario autenticado
router.get('/', auth, async (req, res) => {
    try {
        const routines = await Routine.find({ user: req.user });
        res.status(200).json(routines);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener rutinas', error: err.message });
    }
});

// Crear una nueva rutina
router.post('/', auth, async (req, res) => {
    const { name, description, exercises } = req.body;
    try {
        
        const routine = new Routine({
            name,
            description,
            exercises,
            user: req.user
        });
        await routine.save();
        res.status(201).json(routine);
    } catch (err) {
        res.status(500).json({ msg: 'Error al crear rutina', error: err.message });
    }
});

// Actualizar una rutina
router.put('/:id', auth, async (req, res) => {
    const { name, description, exercises } = req.body;
    try {
        let routine = await Routine.findOne({ _id: req.params.id, user: req.user });
        if (!routine) return res.status(404).json({ msg: 'Rutina no encontrada' });

        routine.name = name || routine.name;
        routine.description = description || routine.description;
        routine.exercises = exercises || routine.exercises;
        await routine.save();
        res.status(200).json(routine);
    } catch (err) {
        res.status(500).json({ msg: 'Error al actualizar rutina' });
    }
});

// Eliminar una rutina
router.delete('/:id', auth, async (req, res) => {
    try {
        const routine = await Routine.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!routine) return res.status(404).json({ msg: 'Rutina no encontrada' });
        res.status(200).json({ msg: 'Rutina eliminada' });
    } catch (err) {
        res.status(500).json({ msg: 'Error al eliminar rutina' });
    }
});

module.exports = router; 