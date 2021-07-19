const express = require('express')
const router = express.Router()
const bonoController = require('../controllers/bonoController')

router.get('/', bonoController.index)
router.get('/create', bonoController.create)
router.get('/edit/:id', bonoController.edit)
router.get('/delete/:id', bonoController.remove)
router.post('/save', bonoController.save)
router.post('/update', bonoController.update)
router.get('/comparacion', bonoController.comparacion)
router.post('/resultados', bonoController.resultados)

module.exports = router