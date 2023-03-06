const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/mongo')
const {authRouter} = require('./router/index.router')
const { errorHandler, notFound } = require('./utils/errorHandler')

const PORT = 3000
const app = express()
app.use(express.json())
app.use(cors())

dbConnect()
app.use("/api/auth", authRouter)
app.use(errorHandler)
app.use(notFound)
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})