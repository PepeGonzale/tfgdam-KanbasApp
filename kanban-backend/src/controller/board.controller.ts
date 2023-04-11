import { Response } from "express";
import {  boardToUser, createBoard, deleteColumn, getBoards, newColumn, updateColumn } from "../services/board.service";
import { AuthRequest } from "../utils/authMiddleware";
import validateMongoDbID from "../utils/validateMongoDbId";


const getBoard = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user;
  validateMongoDbID(_id)
  const fetchBoards = await getBoards(_id);
  res.json(fetchBoards);
};

const postBoard = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user;
  const { title, description } = req.body;
  console.log('hola')
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

export { getBoard, postBoard,editColumn, createColumn, asignUser, removeColumn };
