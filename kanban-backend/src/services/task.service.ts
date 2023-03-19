import Board from "../models/board.model";
import { boardToUser } from "./board.service";

const createTask = async (boardId, title, description, status, userId) => {
  const checkTask = await Board.findOne({
    _id: boardId,
    createdBy: userId,
  });

  if (!checkTask)
    throw new Error(
      `We can not create this task because the board that you are trying to implement this task not exists`
    );

  checkTask.tasks.push({
    title: title,
    description: description,
    status,
  });
  checkTask.save();
  return checkTask;
};

const editTask = async (taskId, taskData, userId) => {
  const board = await Board.findOne({
    "tasks._id": taskId,
    createdBy: userId,
  });
  if (!board) throw new Error(`Task ${taskId} not found`);

  const task = board.tasks.id(taskId);

  task.set({
    ...taskData,
    subtasks: [],
  });

  await board.save();
  return board;
};
const createSubtask = async (taskId, userId, subtask) => {
  const createSubtask = await Board.findOne({
    createdBy: userId,
    "tasks._id": taskId,
  });
  const tasks = createSubtask.tasks.id(taskId);

  tasks.subtasks.push(subtask);
  await createSubtask.save();
  return createSubtask;
};

const updateSubtask = async (taskId, userId, subtask) => {
  const checkTask = await Board.findOne({
    createdBy: userId,
    "tasks._id": taskId,
  });
  if (!checkTask) throw new Error(`Task ${checkTask} not exist`);

  const task = checkTask.tasks.id(taskId);
  const locSubtask = task.subtasks.id(subtask._id);
  /* Comprobar que la subtarea existe en la bbdd */
  if (!locSubtask) throw new Error(`This subtask not exist, please create`);
  locSubtask.set(subtask);
  await checkTask.save();
  return checkTask;
};
const removeSubtask = async () => {
  return;
};

const removeTask = async (userId, taskId) => {
  try {
    const board = await Board.findOneAndUpdate(
      {
        createdBy: userId,
        "tasks._id": taskId,
      },
      { $pull: { tasks: { _id: taskId } } },
      { new: true } // Return the updated board
    );
    if (!board) {
      console.error("fail");
    }
    return board;
  } catch (err) {
    console.error(err);
  }
};
export {
  createTask,
  editTask,
  removeTask,
  createSubtask,
  updateSubtask,
  removeSubtask,
};
