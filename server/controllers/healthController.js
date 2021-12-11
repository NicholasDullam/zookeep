const Health = require('../models/health')
const Animal = require('../models/animal')
const mongoose = require('mongoose')

const createHealth = async (req, res) => {
    let { heart_rate, weight, notes, animal_id } = req.body
    console.log(req.body)
    if (!heart_rate || !weight || !notes || !animal_id) return res.status(400).json({ error: 'Missing Fields' })
    
    // starts transaction to check if animal exists
    let session = await mongoose.startSession()
    session.startTransaction()    
    
    try { 
        const animal = Animal.findById(animal_id)
        if (!animal) throw new Error('animal does not exist')
        let health = new Health({ heart_rate, weight, notes, animal_id })
        const response = health.save()
        await session.commitTransaction()
        session.endSession()
        return res.status(200).json(response)
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ error: error.message })
    }
}

const getHealth = (req, res) => {
    let query = { ...req.query }, subquery = {}, reserved = ['sort', 'skip', 'limit', 'q'], indices = ['user.zoo_id', 'user_id', 'animal_id'], subqueryParams=['user.zoo_id'], pipeline = []
    
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
        pipeline.push({ $lookup: { from: 'user', localField: 'user_id', foreignField: '_id', as: 'user' }})
        pipeline.push({ $unwind: '$user' })
        pipeline.push({ $match: subquery })
    }

    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    if (req.query.skip) pipeline.push({ $skip: Number(req.query.skip) })
    if (req.query.limit) pipeline.push({ $limit: Number(req.query.limit) + 1 })

    Health.aggregate(pipeline).then((response) => {
        let results = { has_more: false, data: response }
        if (req.query.limit && response.length > Number(req.query.limit)) results = { has_more: true, data: response.slice(0, response.length - 1) }
        return res.status(200).json(results)    
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const updateHealthById = (req, res) => {
    let { _id } = req.params
    Health.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteHealthById = (req, res) => {
    let { _id } = req.params
    Animal.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createHealth,
    getHealth,
    updateHealthById,
    deleteHealthById
}