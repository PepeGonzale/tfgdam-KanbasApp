import { Response } from "express";
import {
  asignTask,
  createSubtask,
  getTaskInfo,
  updateComments,
  updateSubtask,
  userWithAccess,
} from "../services/task.service";
import { AuthRequest } from "../utils/authMiddleware";

const {
  createTask,
  editTask,
  removeTask,
} = require("../services/task.service");

const postTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const task = req.body;
  const { _id } = req.user;

  try {
    const tarea = await createTask(id, task, _id);

    res.json(tarea);
  } catch (err) {
    throw new Error(err);
  }
};

const infoTask = async (req: AuthRequest, res: Response) => {
  const { taskId, boardId } = req.params;
  const { _id } = req.user;
  const taskInfo = await getTaskInfo(taskId, boardId, _id);
  res.json(taskInfo);
};
const sendComment = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { _id } = req.user;
  const { comment } = req.body;
  try {
    const postComment = await updateComments(taskId, _id, comment);
    res.json(postComment);
  } catch (err) {
    res.send({ error: "You have to type something" }).status(403);
  }
};
const listAccessUsers = async (req: AuthRequest, res: Response) => {
  const { email } = req.query;
  const { boardId } = req.params;
  const list = await userWithAccess(boardId, email);
  res.json(list);
};
const updateTask = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status, priority, asignedTo } = req.body.task;
  const { _id } = req.user;

  const taskData = {
    title,
    description,
    status,
    priority,
  };

  const updateTask = await editTask(taskId, taskData, asignedTo, _id);

  res.json(updateTask);
};
const asignTaskToUser = async (req: AuthRequest, res: Response) => {
  const { taskId, boardId } = req.params;
  const { asigned } = req.body;
  const taskUser = await asignTask(taskId, asigned, boardId);
  res.json(taskUser);
};
const postSubstask = async (req: AuthRequest, res: Response) => {
  /* Neceito taskId para identificar la tarea donde se va a asignar las subtareas */
  const { taskId } = req.params;
  const { _id } = req.user;
  const subtask = await createSubtask(taskId, _id, req.body);
  res.json(subtask);
};
const editSubtask = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { _id } = req.user;
  const patchSubtask = await updateSubtask(taskId, _id, req.body);
  res.json(patchSubtask);
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { _id } = req.user;
  try {
    const remove = await removeTask(_id, taskId);
    res.json(remove);
  } catch (err) {
    throw new Error(err);
  }
};
export {
  postTask,
  deleteTask,
  updateTask,
  postSubstask,
  editSubtask,
  sendComment,
  listAccessUsers,
  infoTask,
  asignTaskToUser,
};
