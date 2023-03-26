import { Router } from "express";
import {
  createColumn,
  postBoard,
  getBoard,
  asignUser,
  removeColumn,
  
} from "../controller/board.controller";
import {
  deleteTask,
  editSubtask,
  infoTask,
  listAccessUsers,
  postSubstask,
  postTask,
  sendComment,
  updateTask,
} from "../controller/task.controller";
import { isAdmin } from "../utils/authMiddleware";

const router = Router({ mergeParams: true });
router.post("/task/:id", postTask);
router.post("/subtask/:taskId", postSubstask)
router.post("/edit/subtask/:taskId", editSubtask)
router.post("/column/:id", createColumn);
router.post("/", postBoard);
router.get("/access/user/:boardId", listAccessUsers)
router.get("/task/:taskId/board/:boardId", infoTask);
router.post("/board/:boardId/user/:userId", asignUser);
router.post("/task/update/comment/:taskId", sendComment);
router.post("/task/update/:taskId", updateTask);
router.post("/task/delete/:taskId", deleteTask);
router.post("/board/:boardId/column/:columnId", removeColumn)
router.get("/boards",  getBoard);

export default router;
