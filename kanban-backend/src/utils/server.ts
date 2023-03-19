import express from "express"
import cors from "cors"
import authRouter from "../router/user.router"
import boardRouter from "../router/board.router"
import authMiddleware from './authMiddleware';
const createServer = () => {
const app = express();
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRouter)
app.use("/api/boards",authMiddleware, boardRouter)

return app
}
export default createServer