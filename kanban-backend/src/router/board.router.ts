import { Router } from "express";
import boardController from "../controller/board.controller";
import taskController from "../controller/task.controller";
import { useRole } from "../utils/boardMiddleware";

const router = Router({ mergeParams: true });

// Board CRUD
router.get("/boards", boardController.getBoard);
router.post("/", boardController.postBoard);
router.get("/board/:boardId", boardController.getBoardById);
router.patch("/board/:boardId", boardController.patchBoard);
router.delete("/board/:boardId", boardController.removeBoardById);
router.post("/starred/:boardId", boardController.starredProject);

// Board members
router.post("/board/:boardId/user/:userId", useRole, boardController.asignUser);
router.get("/access/user/:boardId", taskController.listAccessUsers);

// Columns (write access required)
router.post("/column/:boardId", useRole, boardController.createColumn);
router.post("/board/:boardId/column/:columnId", useRole, boardController.removeColumn);
router.post("/board/:boardId/column/:columnId/edit", useRole, boardController.editColumn);

// Tasks
router.post("/task/:id", taskController.postTask);
router.get("/task/:taskId/board/:boardId", taskController.infoTask);
router.post("/task/update/:taskId", taskController.updateTask);
router.post("/task/delete/:taskId", taskController.deleteTask);
router.post("/board/:boardId/task/:taskId", taskController.asignTaskToUser);

// Task reorder (drag-and-drop)
router.patch("/board/:boardId/tasks/reorder", taskController.reorderTasksHandler);

// Subtasks
router.post("/subtask/:taskId", taskController.postSubstask);
router.post("/edit/subtask/:taskId", taskController.editSubtask);
router.delete("/subtask/:taskId/:subtaskId", taskController.deleteSubtask);

// Comments
router.post("/task/update/comment/:taskId", taskController.sendComment);

// Search
router.get("/board/:boardId/search", boardController.search);
router.get("/board/:boardId/archived/search", boardController.searchArchived);

// Archive
router.post("/board/:boardId/archived/:taskId", boardController.archiveTasks);
router.get("/board/archived/:boardId", boardController.listArchived);
router.post("/board/:boardId/restore/:taskId", boardController.restoredTask);
router.post("/board/:boardId/delete/archived/:taskId", boardController.deleteArchiveTask);

export default router;
