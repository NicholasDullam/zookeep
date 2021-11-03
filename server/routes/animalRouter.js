const express = require('express')

const AnimalController = require('../controllers/animalController')

const router = express.Router()

router.post('/animals', AnimalController.createAnimal)
router.get('/animals', AnimalController.getAnimals)
router.put('/animals/:_id', AnimalController.updateAnimalById)
router.delete('/animals/:_id', AnimalController.deleteAnimalById)

module.exports = router