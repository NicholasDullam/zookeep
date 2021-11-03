const Animal = require('../models/animal')

const createAnimal = (req, res) => {
    let { name, species, food_type, image_url, enclosure_id } = req.body
    if (!name || !species || !food_type || !image_url || !enclosure_id) return res.status(400).json({ error: 'Missing Fields' })
    let animal = new Animal({ name, species, food_type, image_url, enclosure_id })
    animal.save().then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const getAnimals = (req, res) => {
    let query = { ...req.query }, reserved = ['sort', 'skip', 'limit']
    reserved.forEach((el) => delete query[el])
    let queryPromise = Animal.find(query)

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

const updateAnimalById = (req, res) => {
    let { _id } = req.params
    Animal.findOneAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteAnimalById = (req, res) => {
    let { _id } = req.params
    Animal.findOneAndDelete(_id).then((response) => {
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