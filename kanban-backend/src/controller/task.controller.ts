import { Response } from "express";
import {
  asignTask,
  createSubtask,
  getTaskInfo,
  updateComments,
  updateSubtask,
  removeSubtask,
  userWithAccess,
  createTask,
  editTask,
  removeTask,
  reorderTasks,
} from "../services/task.service";
import { AuthRequest } from "../utils/authMiddleware";

const postTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const task = await createTask(id, req.body, _id);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const infoTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, boardId } = req.params;
    const { _id } = req.user;
    const taskInfo = await getTaskInfo(taskId, boardId, _id);
    res.json(taskInfo);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

const sendComment = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { _id } = req.user;
    const { comment } = req.body;
    const result = await updateComments(taskId, _id, comment);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const listAccessUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.query;
    const { boardId } = req.params;
    const list = await userWithAccess(boardId, email);
    res.json(list);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { _id } = req.user;
    const { title, description, status, priority, asignedTo, dueDate } = req.body.task || req.body;

    const result = await editTask(taskId, { title, description, status, priority, dueDate }, asignedTo, _id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const asignTaskToUser = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, boardId } = req.params;
    const { asigned } = req.body;
    const result = await asignTask(taskId, asigned, boardId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const postSubstask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { _id } = req.user;
    const subtask = await createSubtask(taskId, _id, req.body);
    res.status(201).json(subtask);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const editSubtask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { _id } = req.user;
    const result = await updateSubtask(taskId, _id, req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSubtask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, subtaskId } = req.params;
    const { _id } = req.user;
    const result = await removeSubtask(taskId, subtaskId, _id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { _id } = req.user;
    const result = await removeTask(_id, taskId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const reorderTasksHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const { _id } = req.user;
    const { orderedTaskIds } = req.body;
    if (!Array.isArray(orderedTaskIds)) {
      return res.status(400).json({ error: "orderedTaskIds must be an array" });
    }
    const result = await reorderTasks(boardId, _id, orderedTaskIds);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const taskController = {
  postTask,
  deleteTask,
  updateTask,
  postSubstask,
  editSubtask,
  deleteSubtask,
  sendComment,
  listAccessUsers,
  infoTask,
  asignTaskToUser,
  reorderTasksHandler,
};

export default taskController;
