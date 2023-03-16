import { Router } from "express";
import {
  createColumn,
  postBoard,
  getBoard,
} from "../controller/board.controller";
import {
  deleteTask,
  postTask,
  updateTask,
} from "../controller/task.controller";
import authMiddleware from "../utils/authMiddleware";

const router = Router({ mergeParams: true });
router.post("/task/:id", postTask);
router.post("/column/:id", createColumn);
router.post("/", postBoard);
router.post("/task/update/:taskId", updateTask);
router.post("/task/delete/:taskId", deleteTask);
router.get("/boards", authMiddleware, getBoard);

export default router;
