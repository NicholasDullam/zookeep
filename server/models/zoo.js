var mongoose = require('mongoose');

// Zoo Schema
const Zoo = new mongoose.Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },
    map_url: { type: String, required: true },
    capacity: { type: Number, required: true },
    num_animals: { type: Number, default: 0 },
    num_employees: { type: Number, default: 0 }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Zoo', Zoo);