import { Router } from "express";
import {
  createColumn,
  postBoard,
  getBoard,
  asignUser,
  removeColumn,
  editColumn,
  starredProject,
  getBoardById,
  
} from "../controller/board.controller";
import {
  asignTaskToUser,
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
import { useRole } from "../utils/boardMiddleware";

const router = Router({ mergeParams: true });
router.post("/task/:id", postTask);
router.post("/subtask/:taskId", postSubstask)
router.post("/board/:boardId/task/:taskId", asignTaskToUser)
router.post("/edit/subtask/:taskId", editSubtask)
router.post("/column/:boardId",useRole, createColumn);
router.post("/", postBoard);
router.get("/board/:boardId", getBoardById)
router.get("/user/access", listAccessUsers)
router.get("/access/user/:boardId", listAccessUsers)
router.get("/task/:taskId/board/:boardId", infoTask);
router.post("/board/:boardId/user/:userId", asignUser);
router.post("/starred/:boardId", starredProject)
router.post("/task/update/comment/:taskId", sendComment);
router.post("/task/update/:taskId", updateTask);
router.post("/task/delete/:taskId", deleteTask);
router.post("/board/:boardId/column/:columnId", removeColumn)
router.post("/board/:boardId/column/:columnId/edit", editColumn)
router.get("/boards",  getBoard);

export default router;
