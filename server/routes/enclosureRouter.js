const express = require('express')

const EnclosureController = require('../controllers/enclosureController')

const router = express.Router()

router.post('/enclosures', EnclosureController.createEnclosure)
router.get('/enclosures', EnclosureController.getEnclosures)
router.put('/enclosures/:_id', EnclosureController.updateEnclosureById)
router.delete('/enclosures/:_id', EnclosureController.deleteEnclosureById)

module.exports = router