import Board from "../models/board.model";


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
};
