import { Response } from "express";
import {  boardToUser, createBoard, deleteColumn, getBoards, newColumn } from "../services/board.service";
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
  const payload = {
    title,
    description,
    createdBy: _id,
  };
  const newBoard = await createBoard(payload)
  
  res.json(newBoard);
};
const asignUser = async (req: AuthRequest, res: Response) => {
  const {boardId} = req.params
  const {userId} = req.body;
  const asign = await boardToUser(boardId, userId)
  res.json(asign)
}
const removeColumn = async (req: AuthRequest, res: Response) => {
  const {boardId, columnId} = req.params
  const column = await deleteColumn(boardId, columnId) 
  res.json(column)
};
const createColumn = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, color } = req.body;
  const { _id } = req.user;
  console.log(name, color);
  try {
    const column = await newColumn(id, name, color, _id);
    console.log(name, color);
    res.json(column);
  } catch (err) {
    throw new Error(err)
  }
};

export { getBoard, postBoard, createColumn, asignUser, removeColumn };
