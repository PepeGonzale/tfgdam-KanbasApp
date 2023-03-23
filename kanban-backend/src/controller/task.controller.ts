import { Response } from "express";
import { createSubtask, updateComments, updateSubtask } from "../services/task.service";
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
const sendComment = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params; 
  const {_id} = req.user;
  const {comment} = req.body;
  console.log(req.body)
  const postComment = await updateComments(taskId, _id, comment)
  res.json(postComment)
};
const updateTask = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body.task;
  const { _id } = req.user;
  console.log(req.body);
  const taskData = {
    title,
    description,
    status,
  };

  try {
    const updateTask = await editTask(taskId, taskData, _id);
    res.json(updateTask);
  } catch (err) {
    throw new Error(err);
  }
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
export { postTask, deleteTask, updateTask, postSubstask, editSubtask, sendComment };
