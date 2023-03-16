import { Response } from "express";

import { createBoard, getBoards, newColumn } from "../services/board.service";
import { AuthRequest } from "../utils/authMiddleware";


const getBoard = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user;
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
  const newBoard = await createBoard(payload);
  res.json(newBoard);
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
    console.log(err);
  }
};

export { getBoard, postBoard, createColumn };
