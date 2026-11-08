const { obtenerJoyas, obtenerTotales, obtenerJoyasFiltradas, obtenerJoya } = require('../models/joyas.model')
const { prepararHATEOAS } = require('../helpers/hateoas')

const getJoyas = async (req, res) => {
  try {
    const limits = Number(req.query.limits) || 10
    const page = Number(req.query.page) || 1
    const { order_by } = req.query

    const joyas = await obtenerJoyas({ limits, page, order_by })
    const totales = await obtenerTotales()
    res.json(prepararHATEOAS(joyas, totales))
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error al obtener las joyas' })
  }
}

const getJoyasFiltradas = async (req, res) => {
  try {
    const joyas = await obtenerJoyasFiltradas(req.query)
    res.json(joyas)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error al filtrar las joyas' })
  }
}

const getJoya = async (req, res) => {
  try {
    const joya = await obtenerJoya(req.params.id)
    if (!joya) return res.status(404).json({ error: 'Joya no encontrada' })
    res.json(joya)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error al obtener la joya' })
  }
}

module.exports = { getJoyas, getJoyasFiltradas, getJoya }
