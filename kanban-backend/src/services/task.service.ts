import Board from "../models/board.model";
import UserModel from "../models/user.model";

const createTask = async (boardId: string, task: any, userId: string) => {
  const board = await Board.findOne({ _id: boardId, usersWithAccess: userId });
  if (!board) throw new Error("Board not found or access denied");

  board.tasks.push({
    title: task.title,
    taskNum: board.tasks.length + 1,
    createdBy: userId,
    status: task.status,
    dueDate: task.dueDate ?? null,
    order: board.tasks.length,
  } as any);

  await board.populate("tasks.createdBy");
  await board.save();
  return board;
};

const getTaskInfo = async (taskId: string, boardId: string, userId: string) => {
  const taskInfo = await Board.findOne({
    _id: boardId,
    usersWithAccess: userId,
    "tasks._id": taskId,
  })
    .populate("tasks.asignedTo")
    .populate("tasks.createdBy");

  if (!taskInfo) throw new Error(`Task ${taskId} not found`);
  return taskInfo.tasks.id(taskId);
};

const editTask = async (taskId: string, taskData: any, asignedTo: any, userId: string) => {
  const board = await Board.findOne({
    "tasks._id": taskId,
    usersWithAccess: userId,
  });
  if (!board) throw new Error(`Task ${taskId} not found`);

  const task = board.tasks.id(taskId);
  task.set({
    title: taskData.title ?? task.title,
    description: taskData.description ?? task.description,
    status: taskData.status ?? task.status,
    priority: taskData.priority ?? task.priority,
    dueDate: taskData.dueDate !== undefined ? taskData.dueDate : task.dueDate,
    // subtasks are NOT reset here — use dedicated subtask endpoints
  });

  await board.save();
  return board.populate("tasks.asignedTo");
};

const createSubtask = async (taskId: string, userId: string, subtask: any) => {
  const board = await Board.findOne({
    usersWithAccess: userId,
    "tasks._id": taskId,
  });
  if (!board) throw new Error("Board or task not found");

  const task = board.tasks.id(taskId);
  task.subtasks.push(subtask);
  await board.save();
  return board;
};

const userWithAccess = async (boardId: string, email: any) => {
  const board = await Board.findOne({ _id: boardId }).populate(
    "usersWithAccess",
    "email username image"
  ) as any;
  if (!board) throw new Error("Board not found");

  if (!email) return board.usersWithAccess;

  const filtered = board.usersWithAccess.filter((user: any) =>
    user.email.toLowerCase().includes(String(email).toLowerCase())
  );
  return { usersWithAccess: filtered };
};

const asignTask = async (taskId: string, asignedTo: string, boardId: string) => {
  const board = await Board.findOne({ _id: boardId, "tasks._id": taskId });
  if (!board) throw new Error(`Task ${taskId} not found`);

  const user = await UserModel.findOne({ email: asignedTo });
  if (!user) throw new Error(`User ${asignedTo} not found`);

  const task = board.tasks.id(taskId);
  task.set({ asignedTo: user._id });

  await board.save();
  return board.populate("tasks.asignedTo");
};

const updateSubtask = async (taskId: string, userId: string, subtask: any) => {
  const board = await Board.findOne({
    usersWithAccess: userId,
    "tasks._id": taskId,
  });
  if (!board) throw new Error("Board or task not found");

  const task = board.tasks.id(taskId);
  const locSubtask = task.subtasks.id(subtask._id);
  if (!locSubtask) throw new Error("Subtask not found");

  locSubtask.set(subtask);
  await board.save();
  return board;
};

const removeSubtask = async (taskId: string, subtaskId: string, userId: string) => {
  const board = await Board.findOne({
    usersWithAccess: userId,
    "tasks._id": taskId,
  });
  if (!board) throw new Error("Board or task not found");

  const task = board.tasks.id(taskId);
  const subtask = task.subtasks.id(subtaskId);
  if (!subtask) throw new Error("Subtask not found");

  subtask.deleteOne();
  await board.save();
  return board;
};

const updateComments = async (taskId: string, userId: string, comment: string) => {
  if (!comment?.trim()) throw new Error("Comment cannot be empty");

  const board = await Board.findOne({
    usersWithAccess: userId,
    "tasks._id": taskId,
  });
  if (!board) throw new Error("Board or task not found");

  const task = board.tasks.id(taskId);
  task.comments.push({ comment, commentBy: userId } as any);

  await board.save();
  await board.populate({ path: "tasks.comments.commentBy", model: "User" });
  return task;
};

const removeTask = async (userId: string, taskId: string) => {
  // Allow any board member with access to delete tasks (not just creator)
  const board = await Board.findOneAndUpdate(
    { usersWithAccess: userId, "tasks._id": taskId },
    { $pull: { tasks: { _id: taskId } } },
    { new: true }
  );
  if (!board) throw new Error("Task not found or access denied");
  return board;
};

const reorderTasks = async (boardId: string, userId: string, orderedTaskIds: string[]) => {
  const board = await Board.findOne({ _id: boardId, usersWithAccess: userId });
  if (!board) throw new Error("Board not found or access denied");

  orderedTaskIds.forEach((id, index) => {
    const task = board.tasks.id(id);
    if (task) task.set({ order: index });
  });

  await board.save();
  return board;
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
  asignTask,
  reorderTasks,
};
