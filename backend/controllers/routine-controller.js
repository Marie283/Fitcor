const Routine = require('../models/routine');
const { withTransaction } = require('../utils/with-transaction');

// Obtener todas las rutinas del usuario autenticado.
// Admite el query param opcional ?name=... para filtrar por coincidencia
// parcial (case-insensitive) en el nombre de la rutina usando $regex.
// Es una lectura, así que no necesita transacción: no hay nada que deshacer.
exports.getRoutines = async (req, res) => {
    try {
        const filter = { user: req.user };
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }
        const routines = await Routine.find(filter);
        res.status(200).json(routines);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener rutinas', error: err.message });
    }
};

// Crear una nueva rutina dentro de una transacción.
// El documento se construye dentro de la función porque la transacción puede reintentarse.
exports.createRoutine = async (req, res) => {
    const { name, description, exercises } = req.body;
    try {
        const routine = await withTransaction((session) =>
            new Routine({ name, description, exercises, user: req.user }).save({ session })
        );
        res.status(201).json(routine);
    } catch (err) {
        res.status(500).json({ msg: 'Error al crear rutina', error: err.message });
    }
};

// Actualizar una rutina dentro de una transacción.
// Se usa findOneAndUpdate (filtrando por _id Y user) en vez de find + save
// para hacer la lectura y la escritura en una sola operación atómica,
// manteniendo la comprobación de propiedad del recurso (el usuario solo
// puede actualizar sus propias rutinas).
exports.updateRoutine = async (req, res) => {
    const { name, description, exercises } = req.body;
    try {
        const update = {};
        if (name !== undefined) update.name = name;
        if (description !== undefined) update.description = description;
        if (exercises !== undefined) update.exercises = exercises;

        const routine = await withTransaction((session) =>
            Routine.findOneAndUpdate(
                { _id: req.params.id, user: req.user },
                { $set: update },
                { new: true, runValidators: true, session }
            )
        );
        if (!routine) return res.status(404).json({ msg: 'Rutina no encontrada' });

        res.status(200).json(routine);
    } catch (err) {
        res.status(500).json({ msg: 'Error al actualizar rutina' });
    }
};

// Eliminar una rutina dentro de una transacción.
// findOneAndDelete filtra por _id Y user para que nadie pueda borrar rutinas ajenas.
exports.deleteRoutine = async (req, res) => {
    try {
        const routine = await withTransaction((session) =>
            Routine.findOneAndDelete({ _id: req.params.id, user: req.user }, { session })
        );
        if (!routine) return res.status(404).json({ msg: 'Rutina no encontrada' });
        res.status(200).json({ msg: 'Rutina eliminada' });
    } catch (err) {
        res.status(500).json({ msg: 'Error al eliminar rutina' });
    }
};
