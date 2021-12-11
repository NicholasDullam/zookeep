var mongoose = require('mongoose');

// Animal Schema
const Animal = new mongoose.Schema({
    name: { type: String, required: true },
    heart_rate: { type: Number, required: true },
    weight: { type: Number, Double: true },
    notes: { type: String, required: true },
    animal_id: { type: mongoose.Types.ObjectId, ref: 'animals' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Health', Health);