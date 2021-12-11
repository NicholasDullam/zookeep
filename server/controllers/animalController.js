const Animal = require('../models/animal')
const Enclosure = require('../models/enclosure')
const mongoose = require('mongoose')

const createAnimal = async (req, res) => {
    let { name, species, food_type, image_url, enclosure_id } = req.body
    if (!name || !species || !food_type || !image_url || !enclosure_id) return res.status(400).json({ error: 'Missing Fields' })

    // starts transaction to check if enclosure exist
    let session = await mongoose.startSession()
    session.startTransaction()

    try {
        const enclosure = Enclosure.findById(enclosure_id)
        if (!enclosure) throw new Error('enclosure does not exist')
        let animal = new Animal({ name, species, food_type, image_url, enclosure_id })
        const response = await animal.save()
        await session.commitTransaction()
        session.endSession()
        return res.status(200).json(response)
    } catch (error) { 
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ error: error.message })
    }
}

const getAnimals = (req, res) => {
    let query = { ...req.query }, subquery = {}, reserved = ['sort', 'skip', 'limit', 'q'], indices = ['enclosure.zoo_id', 'enclosure_id'], subqueryParams=['enclosure.zoo_id'], pipeline = []
    
    indices.forEach((el) => {
        if (query[el]) query[el] = mongoose.Types.ObjectId(query[el])
    })

    reserved.forEach((el) => {
        delete query[el]
    })

    subqueryParams.forEach((el) => {
        if (query[el]) {
            subquery[el] = query[el]
            delete query[el]
        }
    })

    pipeline.push({ $match: query })
    if (Object.entries(subquery).length) {
        pipeline.push({ $lookup: { from: 'enclosures', localField: 'enclosure_id', foreignField: '_id', as: 'enclosure' }})
        pipeline.push({ $unwind: '$enclosure' })
        pipeline.push({ $match: subquery })
    }

    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    if (req.query.skip) pipeline.push({ $skip: Number(req.query.skip) })
    if (req.query.limit) pipeline.push({ $limit: Number(req.query.limit) + 1 })

    Animal.aggregate(pipeline).then((response) => {
        let results = { has_more: false, data: response }
        if (req.query.limit && response.length > Number(req.query.limit)) results = { has_more: true, data: response.slice(0, response.length - 1) }
        return res.status(200).json(results)    
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const updateAnimalById = (req, res) => {
    let { _id } = req.params
    Animal.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteAnimalById = (req, res) => {
    let { _id } = req.params
    Animal.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createAnimal,
    getAnimals,
    updateAnimalById,
    deleteAnimalById
}