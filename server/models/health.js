var mongoose = require('mongoose');

// Health Schema
const Health = new mongoose.Schema({
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