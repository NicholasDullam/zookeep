var mongoose = require('mongoose');
const Animal = require('./animal')

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

Enclosure.post('findOneAndDelete', async (doc, next) => {
    await Animal.deleteMany({ enclosure_id: doc._id })
    next()
})

module.exports = mongoose.model('Enclosure', Enclosure);