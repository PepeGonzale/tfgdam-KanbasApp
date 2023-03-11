import express from "express"
import cors from "cors"
import dbConnect from "./config/mongo"
import authRouter from "./router/auth.router"
import boardRouter from "./router/board.router"
const app = express()
app.use(cors())
app.use(express.json())
dbConnect()
app.use("/api/auth", authRouter)
app.use("/api/boards", boardRouter)

app.listen(3000, () =>{
    console.log("Listening in port 3000");
})