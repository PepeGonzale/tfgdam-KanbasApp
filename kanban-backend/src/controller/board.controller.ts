import { Response } from "express";
import {  archiveTask, archiveTaskSearch, boardToUser, createBoard, deleteArchive, deleteColumn, findBoard, getBoards, inputSearch, listArchivedTasks, newColumn, restoreTask, starProject, updateColumn } from "../services/board.service";
import { AuthRequest } from "../utils/authMiddleware";
import validateMongoDbID from "../utils/validateMongoDbId";


const getBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { _id } = req.user;
  validateMongoDbID(_id)
  const fetchBoards = await getBoards(_id);
  res.json(fetchBoards);
  } catch (error) {
    return error
  }
};
const getBoardById = async (req: AuthRequest, res: Response) => {
  const {boardId} = req.params;
  const board = await findBoard(boardId)
  res.json(board)
}
const starredProject = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user;
  const {boardId} = req.params;
  const {starred} = req.body
  const star = await starProject(_id, boardId, starred);
  res.json(star)
};
const postBoard = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user;
  const { title, description } = req.body;
  
  const payload = {
    title,
    description,
    createdBy: _id,
    usersWithAccess: [_id],
    roles: {
      user: _id,
      role: "Write"
  }
  };
  const newBoard = await createBoard(payload)
  
  res.json(newBoard);
};
const asignUser = async (req: AuthRequest, res: Response) => {
  const {boardId, userId} = req.params
  const {payload} = req.body;

 try {
  const asign = await boardToUser(boardId, userId,payload)
  res.json(asign)
 } catch(err) {
  res.send(err)
 }
}
const removeColumn = async (req: AuthRequest, res: Response) => {
  const {boardId, columnId} = req.params
  const column = await deleteColumn(boardId, columnId) 
  res.json(column)
};
const createColumn = async (req: AuthRequest, res: Response) => {
  const { boardId } = req.params;
  const columns = req.body;
  const { _id } = req.user;
  
  try {
    const column = await newColumn(boardId, columns, _id);
    
    res.json(column);
  } catch (err) {
    throw new Error(err)
  }
};
const editColumn = async (req: AuthRequest, res: Response) => {
  const {boardId, columnId} = req.params;
  const update = await updateColumn(boardId, columnId, req.body)
  
  res.json(update)
}
const search = async (req: AuthRequest, res: Response) => {
  const {search} = req.query
  const {boardId} =  req.params;
  console.log(req.query);
  
  const result = await inputSearch(boardId, search) 
  res.json(result)
}

const archiveTasks = async (req: AuthRequest, res: Response) => {
  const {boardId, taskId} = req.params;
  const task = await archiveTask(boardId, taskId)
  res.json(task)
}
const listArchived = async (req: AuthRequest, res: Response) => {
  const {boardId} = req.params;
  const data = await listArchivedTasks(boardId)
  res.json(data)
}
const restoredTask = async (req: AuthRequest, res: Response) => {
  const {boardId, taskId} = req.params;
  const task = await restoreTask(boardId, taskId)
  res.json(task)
}
const searchArchived = async (req: AuthRequest, res: Response) => {
  const { archivedSearch } = req.query;
  const { boardId} = req.params;
  console.log(archivedSearch);
  
  const result = await archiveTaskSearch(boardId, archivedSearch);
  res.json(result)
}
const deleteArchiveTask = async (req: AuthRequest, res: Response) => {
  const {boardId, taskId} = req.params;
  const task = await deleteArchive(boardId, taskId)
  res.json(task)
}
const boardController =  { starredProject,getBoard, postBoard,editColumn, createColumn, asignUser, removeColumn, getBoardById, search, archiveTasks , listArchived, restoredTask, deleteArchiveTask, searchArchived };
export default boardController
