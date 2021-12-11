const Enclosure = require('../models/enclosure')
const Zoo = require('../models/zoo')
const mongoose = require('mongoose')

const createEnclosure = async (req, res) => {
    let { name, zoo_id } = req.body
    if (!name || !zoo_id) return res.status(400).json({ error: 'Missing Fields' })

    // starts transaction to check if zoo
    let session = await mongoose.startSession()
    session.startTransaction()

    try {
        const zoo = await Zoo.findById(zoo_id)
        if (!zoo) throw new Error('zoo does not exist')
        let enclosure = new Enclosure({ name, zoo_id })
        const response = await enclosure.save()
        await session.commitTransaction()
        session.endSession()
        return res.status(200).json(response)
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ error: error.message })
    }
}

const getEnclosures = (req, res) => {
    let query = { ...req.query }, reserved = ['sort', 'skip', 'limit']
    reserved.forEach((el) => delete query[el])
    let queryPromise = Enclosure.find(query)

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

const updateEnclosureById = (req, res) => {
    let { _id } = req.params
    Enclosure.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteEnclosureById = (req, res) => {
    let { _id } = req.params
    Enclosure.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createEnclosure,
    getEnclosures,
    updateEnclosureById,
    deleteEnclosureById
}