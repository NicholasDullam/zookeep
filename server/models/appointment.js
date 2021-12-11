var mongoose = require('mongoose');

// Appointment Schema
const Appointment = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'users' },
    animal_id: { type: mongoose.Types.ObjectId, ref: 'animals' },
    time: { type: Date, required: true },
    status: { type: String, default: 'pending' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Appointment', Appointment);