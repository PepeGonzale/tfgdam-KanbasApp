import { IBoard } from "../interface/board.interface";
import Board from "../models/board.model";
import UserModel from "../models/user.model";

const createBoard = async (data) => {
  const { createdBy } = data;
  const board = new Board(data);
  await board.save();
  return board;
};
const getBoards = async (id: string): Promise<IBoard[]> => {
  const getUserBoards = await Board.find({
    $or: [{ createdBy: id }, { usersWithAccess: { $in: [id] } }],
  })
    .populate("tasks.asignedTo")
    .populate("createdBy")
    .populate("usersWithAccess");

  return getUserBoards;
};
const findBoard = async (board: string) => {
  const find = await Board.findById(board);
  if (!find) throw new Error("Board not found");
  console.log("find", find);
  return (await find.populate("tasks.asignedTo")).populate("createdBy");
};
const starProject = async (_id, boardId, starred) => {
  const star = await Board.findOneAndUpdate(
    {
      _id: boardId,
      createdBy: _id,
    },
    {
      $set: {
        starred,
      },
    },
    { new: true }
  );
  return star;
};
const boardToUser = async (boardId: string, userId: string, role: string) => {
  /* id del nuevo usuario, id de la board */

  const boardUser = await Board.findByIdAndUpdate(
    boardId,
    {
      $push: {
        usersWithAccess: userId,
        roles: {
          user: userId,
          role: role,
        },
      },
    },
    {
      new: true,
    }
  );

  return boardUser;
};

const newColumn = async (boardId, columns, userId) => {
  // Comprobar que exista la tabla con el usuario
  const board = await Board.findOne({
    _id: boardId,
    usersWithAccess: userId,
  });
  if (!board) throw new Error(`This board not exist`);
  if (
    board.column
      .map((e) => e.name.toLowerCase())
      .includes(columns.name.toLowerCase())
  ) {
    throw new Error("This column already exist");
  }
  board.column.push({
    name: columns.name.toLowerCase(),
    color: columns.color,
  });
  await board.save();

  return board;
};
const deleteColumn = async (boardId, columnId) => {
  const column = await Board.findOne({ _id: boardId });
  const taskInColumn = column.tasks.filter((t) => {
    return (
      t.status._id.toString() === column.column.id(columnId)._id.toString()
    );
  });
  taskInColumn.map((t) => {
    return t.deleteOne();
  });
  const actualColumn = column.column.id(columnId).deleteOne();

  await column.save();

  return column;
};
const inputSearch = async (boardId: string, query: any) => {
  const realSearchTime = await Board.find({
    _id: boardId,
    "tasks.title": { $regex: new RegExp(query, "i") },
  });
  const result = await realSearchTime[0].tasks.filter((t) => t.title.includes(query))
  return result;
};
const updateColumn = async (boardId, columnId, columnData) => {
  console.log("columnData", columnData);
  const edit = await Board.findOneAndUpdate(
    {
      _id: boardId,
      "column._id": columnId,
    },
    {
      $set: {
        "column.$.name": columnData.name,
        "column.$.color": columnData.color,
      },
    },
    {
      new: true,
    }
  );
  return edit;
};

const archiveTask = async (boardId: string, taskId: string) => {
  const board = await Board.findOne({
    _id: boardId,
    "tasks._id": taskId
  })
  if (!board) throw new Error('No existe la tarea en el proyecto')
  const checkIfAlreadyAdded = board.archivedTasks.filter(t => t._id.toString() === taskId)
  if (checkIfAlreadyAdded.length > 0) throw new Error('La tarea ya esta en el archivo')
  else {
  /*  */
  await board.archivedTasks.push(board.tasks.id(taskId))
  await board.save().then(async () => {
    const taskIndex = board.tasks.findIndex(t => t._id.toString() === taskId)
    board.tasks.splice(taskIndex, 1) 
    await board.save()
  })
  
  
  return board;
  }

}
const listArchivedTasks = async (boardId) => {
  const tasks = await Board.findOne({
    _id: boardId
  })
  
  return tasks.archivedTasks
}

const restoreTask = async (boardId, taskId) => {
  const board = await Board.findOne({
    _id: boardId,
    "archivedTasks._id": taskId
  })
  if (!board) throw new Error('No existe la tarea en el proyecto')
  const addToTasks = board.tasks.push(board.archivedTasks.id(taskId))
  await board.save().then(async (res) => {
    const taskIndex = board.archivedTasks.findIndex(t => t._id.toString() === taskId)
    board.archivedTasks.splice(taskIndex, 1) 
    await board.save()
  }
  )
  return board;
}
const deleteArchive = async (boardId, taskId) => {
  const board = await Board.findOne({
    _id: boardId,
    "archivedTasks._id": taskId
  })
  if (!board) throw new Error('No existe la tarea en el proyecto')
  const taskIndex = board.archivedTasks.findIndex(t => t._id.toString() === taskId)
  board.archivedTasks.splice(taskIndex, 1)
  await board.save()
  return board;
}
export {
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
  deleteArchive
};
