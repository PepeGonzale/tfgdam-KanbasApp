import { Router } from "express";
import { boardController, taskController} from '../controller/index.controller'
import { useRole } from "../utils/boardMiddleware";

const router = Router({ mergeParams: true });
router.post("/task/:id", taskController.postTask);
router.post("/subtask/:taskId", taskController.postSubstask)
router.post("/board/:boardId/task/:taskId", taskController.asignTaskToUser)
router.post("/edit/subtask/:taskId", taskController.editSubtask)
router.post("/column/:boardId",useRole, boardController.createColumn);
router.post("/", boardController.postBoard);
router.get("/boards",  boardController.getBoard);
router.get("/board/:boardId/search", boardController.search)
router.get("/board/:boardId/archived/search", boardController.searchArchived)
router.get("/board/:boardId", boardController.getBoardById)
router.get("/user/access", taskController.listAccessUsers)
router.get("/access/user/:boardId", taskController.listAccessUsers)
router.get("/task/:taskId/board/:boardId", taskController.infoTask);
router.get("/board/archived/:boardId", boardController.listArchived)
router.post("/board/:boardId/user/:userId", boardController.asignUser);
router.post("/board/:boardId/archived/:taskId", boardController.archiveTasks)
router.post("/board/:boardId/restore/:taskId", boardController.restoredTask)
router.post("/board/:boardId/delete/archived/:taskId", boardController.deleteArchiveTask)
router.post("/starred/:boardId", boardController.starredProject)
router.post("/task/update/comment/:taskId", taskController.sendComment);
router.post("/task/update/:taskId", taskController.updateTask);
router.post("/task/delete/:taskId", taskController.deleteTask);
router.post("/board/:boardId/column/:columnId", boardController.removeColumn)
router.post("/board/:boardId/column/:columnId/edit",boardController.editColumn)


export default router;
