import { Request, Response, Router } from "express";
import {register} from "../controller/auth.controller"
const router = Router();

router.post("/register", register)
router.get("/api/v1", (req:Request, res:Response) => {
    res.send("Prueba")
})
export default router