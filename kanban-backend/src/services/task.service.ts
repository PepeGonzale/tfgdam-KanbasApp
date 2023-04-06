import Board from "../models/board.model";
import UserModel from "../models/user.model";

const createTask = async (boardId, task, userId) => {
  const checkTask = await Board.findOne({
    _id: boardId,
    usersWithAccess: userId,
  });
  if (!checkTask)
    throw new Error(
      `We can not create this task because the board that you are trying to implement this task not exists`
    );

  await checkTask.tasks.push({
    title: task.title,
    description: task.description,
    createdBy: userId,
    status: task.status,
    taskNum: checkTask.tasks.length + 1,
    priority: task.priority,
    
  })
  await checkTask.populate("tasks.createdBy");
  await checkTask.save();
  return checkTask;
};
const getTaskInfo = async (taskId, boardId, userId) => {
  const taskInfo = await Board.findOne({
    _id: boardId,
    usersWithAccess: userId,
    "tasks._id": taskId,
  }).populate("tasks.asignedTo");
  if (!taskInfo) throw new Error(`Task ${taskId} not found`);
  return taskInfo.tasks.id(taskId);

};

const editTask = async (taskId, taskData, asignedTo, userId) => {
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
  return board.populate("tasks.asignedTo");
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
const asignTask = async (taskId, asignedTo, boardId) => {
  /* 
    Para asignar la tarea necesito el id de la tarea, el id del usuario y el id de la board
  */
 const asignTaskToUser = await Board.findOne({
    _id: boardId,
    "tasks._id": taskId,
 });
 console.log('[asigned to]', asignedTo)
 const userId = await UserModel.findOne({
  
     email: asignedTo
    
 })
 if (!userId) throw new Error(`User ${asignedTo} not found`);
 if (!asignTaskToUser) throw new Error(`Task ${taskId} not found`);

 const task = asignTaskToUser.tasks.id(taskId);
 if (!task) throw new Error(`Task ${taskId} not found`);
task.set({
  asignedTo: userId._id
})

 await asignTaskToUser.save();
 return asignTaskToUser.populate("tasks.asignedTo");
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
  userWithAccess,
  getTaskInfo,
  asignTask
};
