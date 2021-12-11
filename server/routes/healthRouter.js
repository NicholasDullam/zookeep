const express = require('express')

const HealthController = require('../controllers/healthController')

const router = express.Router()

router.post('/health', HealthController.createHealth)
router.get('/health', HealthController.getHealth)
router.put('/health/:_id', HealthController.updateHealthById)
router.delete('/health/:_id', HealthController.deleteHealthById)

module.exports = router