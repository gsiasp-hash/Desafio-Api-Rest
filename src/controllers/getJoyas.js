const { obtenerJoyas, obtenerTotales } = require('../models/joyas.model')
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

module.exports = getJoyas
