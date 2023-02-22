import { Request, Response, Router } from "express";

const router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.send("Bienvenido a este pedazo de tfg amigoo!!!")
    console.log("hello");
})
router.get("/api/v1", (req:Request, res:Response) => {
    res.send("Prueba")
})
export default router