import { Request, Response } from "express";
import {
  deleteUserId,
  getIUser,
  getUsers,
  loginUser,
  registerUser,
  saveImage,
  searchByBoardId,
  searchUserEmail,
  updateUser,
  
} from "../services/user.service";
import { FileArray } from 'express-fileupload';

import { AuthRequest } from "../utils/authMiddleware";
import { createJwt } from "../utils/createJwt";
import validateMongoDbID from "../utils/validateMongoDbId";
import { getBuckets, uploadToBucket } from "../utils/s3";
import { Auth } from "aws-sdk/clients/docdbelastic";


const register = async (req: Request, res: Response) => {
  const { email, password, role, mobile, username } = req.body;
  if (!email || !password) {
    throw new Error("Please rewrite the fields with correct data");
  }
  const user = await registerUser({
    email: email,
    password: password,
    role: role,
    username,
    mobile,
  });
  res.json(user);
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
const getUserByEmail = async (req: Request, res: Response) => {
  const {userEmail} = req.params
  const email = await searchUserEmail(userEmail)
  res.json(email)
}
const updateCUsers = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user;
  const data = req.body;
  
  const updateData = await updateUser(_id, data);
  res.json(updateData);
};
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  validateMongoDbID(userId);
  const deleteUsers = await deleteUserId(userId);
  res.json(deleteUsers);
};
const getUser = async (req: Request, res: Response) => {
  const email = req.query['email']
  console.log("Email", email);
  try {
  if (typeof email !== "string") throw new Error("Not found")
  else{
    const regex = new RegExp(email, 'i'); // case-insensitive regular expression
    const usersWithEmail = await getIUser(regex);
    res.json(usersWithEmail);
  }
} catch(err) {
  return err
}
};

const tokenAuthenticate = async (req:Request, res: Response) => {
  const user = {
    _id: "6415e88d2c1995cf4b150ba7",
    email: "pepille@gmail.com"
  }
  const token = await createJwt(user);
  res.json({token:token})
}
const getOneBoard = async (req: AuthRequest, res: Response) => {
  const {_id} = req.user
  const {boardId} = req.params
  const board = await searchByBoardId(_id,boardId)
  res.json(board)
}
interface CustomRequest extends AuthRequest {
  files?: FileArray;
}
const uploadImage = async (req: CustomRequest, res: Response) => {
  const {bucketId} = req.params;
  const file = req.files.image;
  const result = await uploadToBucket(bucketId,file);
  const location = result.Location;
  const updateUserImage = await saveImage(req.body.id, location)
  res.json(updateUserImage);
}
export {
  login,
  register,
  getAllUsers,
  deleteUser,
  updateCUsers,
  getUser,
  getOneBoard,
  tokenAuthenticate,
  uploadImage,
  getUserByEmail
};
