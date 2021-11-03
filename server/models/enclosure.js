var mongoose = require('mongoose');

// Enclosure Schema
const Enclosure = new mongoose.Schema({
    name: { type: String, required: true },
    zoo_id: { type: mongoose.Types.ObjectId, ref: 'zoos', required: true },
    perimeter: [
        {
            type: Number, required: false
        }
    ],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Enclosure', Enclosure);