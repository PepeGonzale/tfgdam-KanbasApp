import express from 'express';
import cors from "cors"
import config from './config/config';
import dbConnect from './config/mongo';
import authRouter from "./router/user.router"
import boardRouter from "./router/board.router"
import authMiddleware from './utils/authMiddleware';
import { errorHandler, notFound } from './utils/errorHandlers';
const app = express();
const PORT = config.PORT || 3001

app.use(express.json())
app.use(cors())

try {
    app.use("/api/auth", authRouter)
    app.use("/api/boards",authMiddleware, boardRouter)
   
    dbConnect().then(data => {
        console.log("db conectada con exito")
      })
} catch(err) {
    console.error(err);
    
}
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});