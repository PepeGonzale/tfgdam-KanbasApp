import { Router } from "express";
import boardController from "../controller/board.controller";
const router = Router()


router.post("/boards", boardController.postBoard)