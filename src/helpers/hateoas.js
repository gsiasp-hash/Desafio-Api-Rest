const prepararHATEOAS = (joyas, totales) => {
  const results = joyas.map((j) => ({
    name: j.nombre,
    href: `/joyas/joya/${j.id}`
  }))

  return {
    totalJoyas: totales.total,
    stockTotal: totales.stock,
    results
  }
}

module.exports = { prepararHATEOAS }
