const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/mongo')
const {authRouter, boardRouter} = require('./router/index.router')
/* 

const { errorHandler, notFound } = require('./utils/errorHandler') */

const PORT = 3000
const app = express()

try {
dbConnect()
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRouter)
app.use("/api/boards",boardRouter)
/* app.use(errorHandler)
app.use(notFound) */
} catch(err) {
    console.log(err);
    
}

/* dbConnect()

app.use("/api/boards",boardRouter)
*/


app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})