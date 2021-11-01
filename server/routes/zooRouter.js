const express = require('express')

const ZooController = require('../controllers/zooController')

const router = express.Router()

router.get('/zoos', ZooController.getZoos)

module.exports = router