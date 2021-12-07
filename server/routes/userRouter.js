const express = require('express')

const UserController = require('../controllers/userController')

const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.put('/users/:_id', UserController.updateUserById)
router.delete('/users/:_id', UserController.deleteUserById)

module.exports = router