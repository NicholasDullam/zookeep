var mongoose = require('mongoose');
const Enclosure = require('./enclosure')
const Animal = require('./animal')

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

Zoo.post('findOneAndDelete', async (doc, next) => {
    let enclosures = await Enclosure.find({ zoo_id: doc._id })
    enclosures.forEach(async (enclosure) => {
        await Enclosure.findByIdAndDelete(enclosure._id)
        await Animal.deleteMany({ enclosure_id: enclosure._id })
    })

    next()
})

module.exports = mongoose.model('Zoo', Zoo);