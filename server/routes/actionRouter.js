const express = require('express')

const ActionController = require('../controllers/actionController')

const router = express.Router()

router.post('/actions', ActionController.createAction)
router.get('/actions', ActionController.getActions)
router.put('/actions/:_id', ActionController.updateActionById)
router.delete('/actions/:_id', ActionController.deleteActionById)

module.exports = router