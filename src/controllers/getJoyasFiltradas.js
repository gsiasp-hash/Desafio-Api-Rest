const { obtenerJoyasFiltradas } = require('../models/joyas.model')

const getJoyasFiltradas = async (req, res) => {
  try {
    const joyas = await obtenerJoyasFiltradas(req.query)
    res.json(joyas)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error al filtrar las joyas' })
  }
}

module.exports = getJoyasFiltradas
