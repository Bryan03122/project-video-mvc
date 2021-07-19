const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.index)
router.get('/create', userController.create)
router.get('/edit/:id', userController.edit)
router.get('/delete/:id', userController.remove)
router.post('/save', userController.save)
router.post('/update', userController.update)

module.exports = router