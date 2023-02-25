import { Request, Response, Router } from "express";
import {login, register} from "../controller/auth.controller"
const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get("/api/v1", (req:Request, res:Response) => {
    res.send("Prueba")
})
export default router