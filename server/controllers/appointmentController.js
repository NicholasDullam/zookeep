const Appointment = require('../models/appointment')

const createAppointment = (req, res) => {
    let { user_id, animal_id, time, status } = req.body
    if (!user_id || !animal_id || !time || !status) return res.status(400).json({ error: 'Missing Fields' })
    let appointment = new Appointment({ user_id, animal_id, time, status })
    appointment.save().then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const getAppointments = (req, res) => {
    let query = { ...req.query }, subquery = {}, reserved = ['sort', 'skip', 'limit', 'q'], indices = ['user.zoo_id'], subqueryParams=['user.zoo_id'], pipeline = []
    
    indices.forEach((el) => {
        if (query[el]) query[el] = mongoose.Types.ObjectId(query[el])
    })

    reserved.forEach((el) => {
        delete queryUser[el]
    })

    subqueryParams.forEach((el) => {
        if (query[el]) {
            subqueryUser[el] = query[el]
            delete query[el]
        }
    })


    pipeline.push({ $match: query })
    if (Object.entries(subquery).length) {
        pipeline.push({ $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' }})
        pipeline.push({ $unwind: "$user" })
        pipeline.push({ $match: subquery })
    }
    
    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    if (req.query.skip) pipeline.push({ $skip: Number(req.query.skip) })
    if (req.query.limit) pipeline.push({ $limit: Number(req.query.limit) + 1 })


    Appointment.aggregate(pipeline).then((response) => {
        let results = { has_more: false, data: response }
        if (req.query.limit && response.length > Number(req.query.limit)) results = { has_more: true, data: response.slice(0, response.length - 1) }
        return res.status(200).json(results)    
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const updateAppointmentById = (req, res) => {
    let { _id } = req.params
    Appointment.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteAppointmentById = (req, res) => {
    let { _id } = req.params
    Appointment.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentById,
    deleteAppointmentById
}

