const express = require('express')

const AppointmentController = require('../controllers/appointmentController')

const router = express.Router()

router.post('/appointments', AppointmentController.createAppointment)
router.get('/appointments', AppointmentController.getAppointments)
router.put('/appointments/:_id', AppointmentController.updateAppointmentById)
router.delete('/appointments/:_id', AppointmentController.deleteAppointmentById)

module.exports = router