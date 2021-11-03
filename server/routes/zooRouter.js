const express = require('express')

const ZooController = require('../controllers/zooController')

const router = express.Router()

router.post('/zoos', ZooController.createZoo)
router.get('/zoos', ZooController.getZoos)
router.put('/zoos/:_id', ZooController.updateZooById)
router.delete('/zoos/:_id', ZooController.deleteZooById)

module.exports = router