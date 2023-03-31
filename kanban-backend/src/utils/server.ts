import express from "express"
import cors from "cors"
import authRouter from "../router/user.router"
import boardRouter from "../router/board.router"
import {authMiddleware} from './authMiddleware';
import fileUpload from "express-fileupload"
const createServer = () => {
const app = express();
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    debug:true
}));
app.use("/api/auth", authRouter)
app.use("/api/boards",authMiddleware, boardRouter)

return app
}
export default createServer