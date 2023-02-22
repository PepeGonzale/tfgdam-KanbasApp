import express from "express"
import cors from "cors"
import router from "./routes/index.router"
import config from "./config/config"
import dbConnect from "./config/mongo"

const PORT = config.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors())
try {
app.use(router)
dbConnect()
.then(data => {
    console.log("db conectada con exito");
});
} catch(err) {
    console.log(err)
}
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})