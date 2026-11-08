const pool = require('../config/db')

const COLUMNAS = ['id', 'nombre', 'categoria', 'metal', 'precio', 'stock']
const DIRECCIONES = ['ASC', 'DESC']

const obtenerJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {
  const [campo, direccion = 'ASC'] = order_by.split('_')
  const orden = COLUMNAS.includes(campo) ? campo : 'id'
  const sentido = DIRECCIONES.includes(direccion.toUpperCase()) ? direccion.toUpperCase() : 'ASC'
  const offset = (page - 1) * limits

  const consulta = `SELECT * FROM inventario ORDER BY ${orden} ${sentido} LIMIT $1 OFFSET $2`
  const { rows } = await pool.query(consulta, [limits, offset])
  return rows
}

const obtenerTotales = async () => {
  const consulta = 'SELECT COUNT(*) AS total, COALESCE(SUM(stock), 0) AS stock FROM inventario'
  const { rows } = await pool.query(consulta)
  return { total: Number(rows[0].total), stock: Number(rows[0].stock) }
}

const obtenerJoyasFiltradas = async ({ precio_min, precio_max, categoria, metal }) => {
  const filtros = []
  const valores = []

  const agregarFiltro = (campo, comparador, valor) => {
    valores.push(valor)
    filtros.push(`${campo} ${comparador} $${valores.length}`)
  }

  if (precio_min) agregarFiltro('precio', '>=', precio_min)
  if (precio_max) agregarFiltro('precio', '<=', precio_max)
  if (categoria) agregarFiltro('categoria', '=', categoria)
  if (metal) agregarFiltro('metal', '=', metal)

  let consulta = 'SELECT * FROM inventario'
  if (filtros.length > 0) consulta += ` WHERE ${filtros.join(' AND ')}`

  const { rows } = await pool.query(consulta, valores)
  return rows
}

const obtenerJoya = async (id) => {
  const { rows } = await pool.query('SELECT * FROM inventario WHERE id = $1', [id])
  return rows[0]
}

module.exports = { obtenerJoyas, obtenerTotales, obtenerJoyasFiltradas, obtenerJoya }
