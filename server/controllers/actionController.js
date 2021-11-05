const Action = require('../models/action')
const mongoose = require('mongoose')

const createAction = (req, res) => {
    let { name, user_id, time, recurring, enclosure_id } = req.body
    if (!name, !user_id || !time || !recurring || !enclosure_id) return res.status(400).json({ error: 'Missing Fields' })
    let action = new Action({ user_id, time, recurring, enclosure_id })
    action.save().then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}
/* FIXXXXXXX */

const getActions = (req, res) => {
    let query = { ...req.query }, subquery = {}, reserved = ['sort', 'skip', 'limit', 'q'], indices = ['enclosure.zoo_id'], subqueryParams=['enclosure.zoo_id'], pipeline = []
    
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
        pipeline.push({ $project: { _id: '$_id', name: '$name', species: '$species', image_url: '$image_url', food_type: '$food_type', enclosure_id: '$enclosure_id', enclosure: { $arrayElemAt: [ "$enclosure", 0 ]} }})
        pipeline.push({ $match: subquery })
    }
    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    if (req.query.skip) pipeline.push({ $skip: Number(req.query.skip) })
    if (req.query.limit) pipeline.push({ $limit: Number(req.query.limit) + 1 })

    console.log(pipeline)

    Animal.aggregate(pipeline).then((response) => {
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