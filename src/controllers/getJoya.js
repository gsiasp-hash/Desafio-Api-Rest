const { obtenerJoya } = require('../models/joyas.model')

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

module.exports = getJoya
