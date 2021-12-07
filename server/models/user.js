var mongoose = require('mongoose');

// User Schema
const User = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image_url: { type: String, required: true },
    managed_by: { type: mongoose.Types.ObjectId, ref: 'users' },
    zoo_id: { type: mongoose.Types.ObjectId, ref: 'zoos' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('User', User);