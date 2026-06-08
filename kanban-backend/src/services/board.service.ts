import Board from "../models/board.model";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createBoard = async (data: any) => {
  const board = new Board(data);
  await board.save();
  return board;
};

const getBoards = async (id: string) => {
  return Board.find({
    $or: [{ createdBy: id }, { usersWithAccess: { $in: [id] } }],
  })
    .populate("tasks.asignedTo")
    .populate("createdBy")
    .populate("usersWithAccess");
};

const findBoard = async (boardId: string) => {
  const board = await Board.findById(boardId);
  if (!board) throw new Error("Board not found");
  return (await board.populate("tasks.asignedTo")).populate("createdBy");
};

const updateBoard = async (boardId: string, userId: string, data: { title?: string; description?: string }) => {
  const board = await Board.findOneAndUpdate(
    { _id: boardId, createdBy: userId },
    { $set: { ...(data.title && { title: data.title }), ...(data.description !== undefined && { description: data.description }) } },
    { new: true, runValidators: true }
  );
  if (!board) throw new Error("Board not found or only the creator can update it");
  return board;
};

const deleteBoard = async (boardId: string, userId: string) => {
  const board = await Board.findOneAndDelete({ _id: boardId, createdBy: userId });
  if (!board) throw new Error("Board not found or only the creator can delete it");
  return { message: "Board deleted" };
};

const starProject = async (userId: string, boardId: string, starred: boolean) => {
  return Board.findOneAndUpdate(
    { _id: boardId, $or: [{ createdBy: userId }, { usersWithAccess: { $in: [userId] } }] },
    { $set: { starred } },
    { new: true }
  );
};

const boardToUser = async (boardId: string, userId: string, role: string) => {
  // Remove any existing role for this user first, then add the new one
  await Board.findByIdAndUpdate(boardId, {
    $pull: { roles: { user: userId } },
  });
  return Board.findByIdAndUpdate(
    boardId,
    {
      $addToSet: { usersWithAccess: userId },
      $push: { roles: { user: userId, role: role || "Read" } },
    },
    { new: true }
  );
};

const newColumn = async (boardId: string, columns: { name: string; color?: string }, userId: string) => {
  const board = await Board.findOne({ _id: boardId, usersWithAccess: userId });
  if (!board) throw new Error("Board not found or access denied");

  const nameExists = board.column.some(
    (c) => c.name.toLowerCase() === columns.name.toLowerCase()
  );
  if (nameExists) throw new Error("A column with this name already exists");

  board.column.push({ name: columns.name.toLowerCase(), color: columns.color } as any);
  await board.save();
  return board;
};

const deleteColumn = async (boardId: string, columnId: string) => {
  const board = await Board.findById(boardId);
  if (!board) throw new Error("Board not found");

  const col = board.column.id(columnId);
  if (!col) throw new Error("Column not found");

  // Remove all tasks in this column
  board.tasks = board.tasks.filter(
    (t) => t.status._id.toString() !== columnId
  ) as any;

  col.deleteOne();
  await board.save();
  return board;
};

const updateColumn = async (boardId: string, columnId: string, columnData: { name?: string; color?: string }) => {
  return Board.findOneAndUpdate(
    { _id: boardId, "column._id": columnId },
    {
      $set: {
        ...(columnData.name && { "column.$.name": columnData.name }),
        ...(columnData.color !== undefined && { "column.$.color": columnData.color }),
      },
    },
    { new: true }
  );
};

const inputSearch = async (boardId: string, query: any) => {
  if (!query) return [];
  const safe = escapeRegex(String(query));
  const boards = await Board.find({
    _id: boardId,
    "tasks.title": { $regex: new RegExp(safe, "i") },
  });
  if (!boards.length) return [];
  return boards[0].tasks.filter((t) =>
    t.title.toLowerCase().includes(String(query).toLowerCase())
  );
};

const archiveTask = async (boardId: string, taskId: string) => {
  const board = await Board.findOne({ _id: boardId, "tasks._id": taskId });
  if (!board) throw new Error("Task not found in this board");

  const alreadyArchived = board.archivedTasks.some(
    (t) => t._id.toString() === taskId
  );
  if (alreadyArchived) throw new Error("Task is already archived");

  const task = board.tasks.id(taskId);
  board.archivedTasks.push(task.toObject() as any);
  task.deleteOne();
  await board.save();
  return board;
};

const listArchivedTasks = async (boardId: string) => {
  const board = await Board.findById(boardId);
  if (!board) throw new Error("Board not found");
  return board.archivedTasks;
};

const restoreTask = async (boardId: string, taskId: string) => {
  const board = await Board.findOne({ _id: boardId, "archivedTasks._id": taskId });
  if (!board) throw new Error("Archived task not found");

  const task = board.archivedTasks.id(taskId);
  board.tasks.push(task.toObject() as any);
  task.deleteOne();
  await board.save();
  return board;
};

const deleteArchive = async (boardId: string, taskId: string) => {
  const board = await Board.findOne({ _id: boardId, "archivedTasks._id": taskId });
  if (!board) throw new Error("Archived task not found");

  board.archivedTasks.id(taskId).deleteOne();
  await board.save();
  return board;
};

const archiveTaskSearch = async (boardId: string, query: any) => {
  if (!query) return [];
  const safe = escapeRegex(String(query));
  const boards = await Board.find({
    _id: boardId,
    "archivedTasks.title": { $regex: new RegExp(safe, "i") },
  });
  if (!boards.length) return [];
  return boards[0].archivedTasks.filter((t) =>
    t.title.toLowerCase().includes(String(query).toLowerCase())
  );
};

export {
  updateBoard,
  deleteBoard,
  updateColumn,
  listArchivedTasks,
  archiveTask,
  inputSearch,
  createBoard,
  getBoards,
  newColumn,
  restoreTask,
  starProject,
  boardToUser,
  deleteColumn,
  findBoard,
  deleteArchive,
  archiveTaskSearch,
};
