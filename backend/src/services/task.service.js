const { findByIdAndUpdate } = require("../models/board.model");
const Board = require("../models/board.model");

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
  if (!board) throw new BadRequestError(`Task ${taskId} not found`);

  const task = board.tasks.id(taskId);
  
  task.set({
    ...taskData,
    subtasks: [],
  });

  await board.save();
  return board;
};
const removeTask = async (userId, taskId) => {
try {  
  const board = await Board.findOne({
    createdBy: userId,
    'tasks._id': taskId,
  });

  if (!board) {
    console.error("fail");
  }
  const boardId = board._id
  const deleteTask = await Board.updateOne( { _id: boardId },
    { $pull: { tasks: { _id: taskId } } })
 console.log(deleteTask);
  return board;
} catch(err) {
  console.error(err);
}
}
module.exports = {
  createTask,
  editTask,
  removeTask,
};
