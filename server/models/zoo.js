var mongoose = require('mongoose');

// Zoo Schema
const Zoo = new mongoose.Schema({
    // put attributes here
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Zoo', Zoo);