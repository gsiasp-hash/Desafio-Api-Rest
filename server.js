require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('./src/middlewares/logger')
const joyasRoutes = require('./src/routes/joyas.routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/joyas', joyasRoutes)

app.listen(PORT, () => console.log(`Servidor encendido en http://localhost:${PORT}`))
