import { Response } from "express";
import { AuthRequest } from "../utils/authMiddleware";

const {
  createTask,
  editTask,
  removeTask,
} = require("../services/task.service");

const postTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const { _id } = req.user;

  try {
    console.log(status);
    const tarea = await createTask(id, title, description, status, _id);
    res.json(tarea);
  } catch (err) {
    throw new Error(err)  }
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
    throw new Error(err)  }
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { _id } = req.user;
  try {
    const remove = await removeTask(_id, taskId);
    res.json(remove);
  } catch (err) {
    throw new Error(err)  }
};
export { postTask, deleteTask, updateTask };
