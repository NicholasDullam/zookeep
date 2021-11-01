var mongoose = require('mongoose');

// Animal Schema
const Animal = new mongoose.Schema({
    // put attributes here
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Animal', Animal);