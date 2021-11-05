var mongoose = require('mongoose');

// Action Schema
const Action = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: 'users'},
    time: { type: Date, required: true },
    recurring: { type: Boolean, required: true },
    enclosure_id: { type: mongoose.Types.ObjectId, ref: 'enclosures' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Action', Action);