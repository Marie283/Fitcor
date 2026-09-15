const express = require('express');
const routineController = require('../controllers/routine-controller');
const auth = require('../middleware/auth');

const router = express.Router();

// Listar (GET, admite ?name= para filtrar) y crear (POST) rutinas
router.route('/')
    .get(auth, routineController.getRoutines)
    .post(auth, routineController.createRoutine);

// Actualizar (PUT) y eliminar (DELETE) una rutina concreta
router.route('/:id')
    .put(auth, routineController.updateRoutine)
    .delete(auth, routineController.deleteRoutine);

module.exports = router;
