import { Router } from "express";
import boardController from "../controller/board.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

router.post("/task/:id",authMiddleware, boardController.postTask)
router.post("/column/:id",authMiddleware, boardController.createColumn)
router.post("/",authMiddleware, boardController.postBoard)


router.get("/boards",authMiddleware, boardController.getBoard)

export default router