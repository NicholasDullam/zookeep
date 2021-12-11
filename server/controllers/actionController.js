const Action = require('../models/action')
const User = require('../models/user')
const Enclosure = require('../models/enclosure')
const mongoose = require('mongoose')

const createAction = async (req, res) => {
    let { name, user_id, time, recurring, enclosure_id } = req.body
    if (!name, !user_id || !time || !enclosure_id) return res.status(400).json({ error: 'Missing Fields' })

    // starts transaction to check if user and enclosure exist
    let session = await mongoose.startSession()
    session.startTransaction()

    try {
        const user = await User.findById(user_id)
        if (!user) throw new Error('user does not exist')
        const enclosure = await Enclosure.findById(enclosure_id)
        if (!enclosure) throw new Error('enclosure does not exist')
        let action = new Action({ name, user_id, time, recurring, enclosure_id })
        const response = await action.save()
        await session.commitTransaction()
        session.endSession()
        return res.status(200).json(response)
    } catch (error) { 
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ error: error.message })
    }
}

const getActions = (req, res) => {
    let query = { ...req.query }, subquery = {}, reserved = ['sort', 'skip', 'limit', 'q'], indices = ['enclosure.zoo_id', 'user_id'], subqueryParams=['enclosure.zoo_id'], pipeline = []
    
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
        pipeline.push({ $unwind: "$enclosure" })
        pipeline.push({ $match: subquery })
    }
    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    if (req.query.skip) pipeline.push({ $skip: Number(req.query.skip) })
    if (req.query.limit) pipeline.push({ $limit: Number(req.query.limit) + 1 })

    Action.aggregate(pipeline).then((response) => {
        let results = { has_more: false, data: response }
        if (req.query.limit && response.length > Number(req.query.limit)) results = { has_more: true, data: response.slice(0, response.length - 1) }
        return res.status(200).json(results)    
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const updateActionById = (req, res) => {
    let { _id } = req.params
    Action.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteActionById = (req, res) => {
    let { _id } = req.params
    Action.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createAction,
    getActions,
    updateActionById,
    deleteActionById
}