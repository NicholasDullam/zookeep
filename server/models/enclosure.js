var mongoose = require('mongoose');

// Enclosure Schema
const Enclosure = new mongoose.Schema({
    // put attributes here
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Enclosure', Enclosure);