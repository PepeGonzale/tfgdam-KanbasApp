import { Request, Response } from "express";
import {
  deleteUserId,
  getIUser,
  getUsers,
  loginUser,
  registerUser,
  searchByBoardId,
  updateUser,
  
} from "../services/user.service";
import { AuthRequest } from "../utils/authMiddleware";
import validateMongoDbID from "../utils/validateMongoDbId";

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    throw new Error("Please rewrite the fields with correct data");
  }
  const user = await registerUser(email, password);
  res.send({ status: "OK", user: user });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  if (user) {
    res.send(user);
  } else {
    throw new Error("Invalid Credentials");
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getUsers();
  res.json(allUsers);
};
const updateCUsers = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = req.body;
  validateMongoDbID(userId);
  const updateData = await updateUser(userId, data);
  res.json(updateData);
};
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  validateMongoDbID(userId);
  const deleteUsers = await deleteUserId(userId);
  res.json(deleteUsers);
};
const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getIUser(userId);
  res.json(user);
};

const getOneBoard = async (req: AuthRequest, res: Response) => {
  const {_id} = req.user
  const {boardId} = req.params
  const board = await searchByBoardId(_id,boardId)
  res.json(board)
}

export {
  login,
  register,
  getAllUsers,
  deleteUser,
  updateCUsers,
  getUser,
  getOneBoard
};
