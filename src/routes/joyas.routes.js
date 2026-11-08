const { Router } = require('express')
const getJoyas = require('../controllers/getJoyas')
const getJoyasFiltradas = require('../controllers/getJoyasFiltradas')
const getJoya = require('../controllers/getJoya')

const router = Router()

router.get('/', getJoyas)
router.get('/filtros', getJoyasFiltradas)
router.get('/joya/:id', getJoya)

module.exports = router
