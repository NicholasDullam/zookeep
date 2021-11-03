const Zoo = require('../models/zoo')

const createZoo = (req, res) => {
    let { city, state, map_url, capacity } = req.body
    if (!city || !state || !map_url || !capacity) return res.status(400).json({ error: 'Missing Fields' })
    let zoo = new Zoo({ city, state, map_url, capacity })
    zoo.save().then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const getZoos = (req, res) => {
    let query = { ...req.query }, reserved = ['sort', 'skip', 'limit']
    reserved.forEach((el) => delete query[el])
    let queryPromise = Zoo.find(query)

    if (req.query.sort) queryPromise = queryPromise.sort(req.query.sort)
    if (req.query.skip) queryPromise = queryPromise.skip(Number(req.query.skip))
    if (req.query.limit) queryPromise = queryPromise.limit(Number(req.query.limit))

    queryPromise.then((response) => {
        let results = { has_more: false, data: response }
        if (req.query.limit && response.length > Number(req.query.limit)) results = { has_more: true, data: response.slice(0, response.length - 1) }
        return res.status(200).json(results)  
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const updateZooById = (req, res) => {
    let { _id } = req.params
    Zoo.findOneAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteZooById = (req, res) => {
    let { _id } = req.params
    Zoo.findOneAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createZoo,
    getZoos,
    updateZooById,
    deleteZooById
}