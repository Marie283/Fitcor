const Routine = require('../models/routine');
const { withTransaction } = require('../utils/with-transaction');

// Obtener las rutinas del usuario autenticado, con filtros opcionales por query params.
// Es una lectura, así que no necesita transacción: no hay nada que deshacer.
//
// Filtros admitidos (se combinan entre sí):
//   ?name=core              -> coincidencia parcial sin distinguir mayúsculas ($regex)
//   ?ejercicios=Sentadilla,Plancha -> rutinas que incluyan alguno de esos ejercicios ($in)
//   ?minEjercicios=3        -> rutinas con al menos 3 ejercicios ($gte sobre $size)
//   ?desde=2026-01-01       -> creadas a partir de esa fecha ($gte)
//   ?hasta=2026-12-31       -> creadas hasta esa fecha ($lte)
exports.getRoutines = async (req, res, next) => {
    try {
        const { name, ejercicios, minEjercicios, desde, hasta } = req.query;
        const filter = { user: req.user };

        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (ejercicios) {
            // split + trim para aceptar "Sentadilla, Plancha" con o sin espacios
            filter['exercises.name'] = { $in: ejercicios.split(',').map(e => e.trim()).filter(Boolean) };
        }
        if (minEjercicios) {
            // $expr permite comparar con el tamaño del array de ejercicios del propio documento
            filter.$expr = { $gte: [{ $size: '$exercises' }, Number(minEjercicios)] };
        }
        if (desde || hasta) {
            // createdAt lo añade automáticamente el schema con timestamps: true
            filter.createdAt = {};
            if (desde) filter.createdAt.$gte = new Date(desde);
            if (hasta) filter.createdAt.$lte = new Date(hasta);
        }

        const routines = await Routine.find(filter);
        res.status(200).json(routines);
    } catch (err) {
        // Se delega en el middleware de errores de server.js en vez de responder
        // un 500 distinto en cada controlador
        next(err);
    }
};

// Crear una nueva rutina dentro de una transacción.
// El documento se construye dentro de la función porque la transacción puede reintentarse.
exports.createRoutine = async (req, res, next) => {
    const { name, description, exercises } = req.body;
    try {
        // Validación de entrada: sin nombre no se crea nada (400, no 500)
        if (!name) return res.status(400).json({ msg: 'El nombre de la rutina es obligatorio' });

        const routine = await withTransaction((session) =>
            new Routine({ name, description, exercises, user: req.user }).save({ session })
        );
        res.status(201).json(routine);
    } catch (err) {
        next(err);
    }
};

// Actualizar una rutina dentro de una transacción. Sirve para PUT (reemplazo de los
// campos enviados) y para PATCH (actualización parcial), porque solo se tocan los
// campos presentes en el body.
// Se usa findOneAndUpdate (filtrando por _id Y user) en vez de find + save para
// hacer la lectura y la escritura en una sola operación atómica, manteniendo la
// comprobación de propiedad del recurso.
exports.updateRoutine = async (req, res, next) => {
    const { name, description, exercises } = req.body;
    try {
        const update = {};
        if (name !== undefined) update.name = name;
        if (description !== undefined) update.description = description;
        if (exercises !== undefined) update.exercises = exercises;

        // Sin campos que actualizar, la petición no es válida
        if (Object.keys(update).length === 0) {
            return res.status(400).json({ msg: 'No se ha enviado ningún campo para actualizar' });
        }

        const routine = await withTransaction((session) =>
            Routine.findOneAndUpdate(
                { _id: req.params.id, user: req.user },
                { $set: update },
                { new: true, runValidators: true, session }
            )
        );
        // No encontrada, o es de otro usuario: en ambos casos 404
        if (!routine) return res.status(404).json({ msg: 'Rutina no encontrada' });

        res.status(200).json(routine);
    } catch (err) {
        next(err);
    }
};

// Eliminar una rutina dentro de una transacción.
// findOneAndDelete filtra por _id Y user para que nadie pueda borrar rutinas ajenas.
exports.deleteRoutine = async (req, res, next) => {
    try {
        const routine = await withTransaction((session) =>
            Routine.findOneAndDelete({ _id: req.params.id, user: req.user }, { session })
        );
        if (!routine) return res.status(404).json({ msg: 'Rutina no encontrada' });
        res.status(200).json({ msg: 'Rutina eliminada' });
    } catch (err) {
        next(err);
    }
};
