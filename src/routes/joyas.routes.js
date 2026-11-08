const { Router } = require('express')
const { getJoyas, getJoyasFiltradas, getJoya } = require('../controllers/joyas.controller')

const router = Router()

router.get('/', getJoyas)
router.get('/filtros', getJoyasFiltradas)
router.get('/joya/:id', getJoya)

module.exports = router
