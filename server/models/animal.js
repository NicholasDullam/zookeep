var mongoose = require('mongoose');

// Animal Schema
const Animal = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    species: { type: String, required: true },
    food_type: { type: String, required: true },
    enclosure_id: { type: mongoose.Types.ObjectId, ref: 'enclosures' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Animal', Animal);