import Board from "../models/board.model";
import { boardToUser } from "./board.service";

const createTask = async (boardId, task, userId) => {
  const checkTask = await Board.findOne({
    _id: boardId,
    usersWithAccess: userId,
  });
  console.log(task);

  if (!checkTask)
    throw new Error(
      `We can not create this task because the board that you are trying to implement this task not exists`
    );

  checkTask.tasks.push({
    title: task.title,
    description: task.description,
    status: task.status,
    taskNum: checkTask.tasks.length + 1,
    priority: task.priority,
  });
  checkTask.save();
  return checkTask;
};

const editTask = async (taskId, taskData, userId) => {
  const board = await Board.findOne({
    "tasks._id": taskId,
    usersWithAccess: userId,
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
    usersWithAccess: userId,
    "tasks._id": taskId,
  });
  const tasks = createSubtask.tasks.id(taskId);

  tasks.subtasks.push(subtask);
  await createSubtask.save();
  return createSubtask;
};
const userWithAccess = async (boardId) => {
  const listUsers = await Board.findById(boardId);
  listUsers.populate("usersWithAccess")
  return listUsers.populate("usersWithAccess")
}

const updateSubtask = async (taskId, userId, subtask) => {
  const checkTask = await Board.findOne({
    usersWithAccess: userId,
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
const updateComments = async (taskId, userId, comment) => {
  const createComment = await Board.findOne({
    usersWithAccess: userId,
    "tasks._id": taskId,
  });
  try {
    // Tarea que queremos subir el comentario
    const task = createComment.tasks.id(taskId);
    await task.comments.push({
      comment: comment,
      commentBy: userId,
    });

    await createComment.save();
    await createComment.populate({
      path: "tasks.comments.commentBy",
      model: "User",
    });
    console.log("[task]", task);
    return task;
  } catch (err) {
    err.message("You have to write something");
    throw new Error(`You have to write something`);
  }
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
  updateComments,
  userWithAccess
};
