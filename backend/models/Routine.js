const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Routine', RoutineSchema); 