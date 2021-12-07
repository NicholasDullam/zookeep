const User = require('../models/user')

const createUser = (req, res) => {
    let { name, role, image_url, managed_by } = req.body
    if (!name || !role || !image_url || !managed_by) return res.status(400).json({ error: 'Missing Fields' })
    let user = new User({ name, role, image_url, managed_by })
    user.save().then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const getUsers = (req, res) => {
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

const updateUserById = (req, res) => {
    let { _id } = req.params
    User.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteUserById = (req, res) => {
    let { _id } = req.params
    User.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createUser,
    getUsers,
    updateUserById,
    deleteUserById
}