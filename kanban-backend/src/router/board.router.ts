import { Router } from "express";
import {
  createColumn,
  postBoard,
  getBoard,
  asignUser,
  
} from "../controller/board.controller";
import {
  deleteTask,
  editSubtask,
  postSubstask,
  postTask,
  updateTask,
} from "../controller/task.controller";
import authMiddleware from "../utils/authMiddleware";

const router = Router({ mergeParams: true });
router.post("/task/:id", postTask);
router.post("/subtask/:taskId", postSubstask)
router.post("/edit/subtask/:taskId", editSubtask)
router.post("/column/:id", createColumn);
router.post("/", postBoard);
router.post("/asign/:boardId", asignUser)
router.post("/task/update/:taskId", updateTask);
router.post("/task/delete/:taskId", deleteTask);

router.get("/boards",  getBoard);

export default router;
