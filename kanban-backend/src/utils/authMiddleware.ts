import UserModel from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { User } from "../interface/user.interface";
import verifyToken from "./verifyToken";
export interface AuthRequest extends Request {
  user: User;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = verifyToken(token);
        const user = await UserModel.findById(decoded.userId);

        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("Not Authorized token expired, please login again");
    }
  } else {
    throw new Error("There is no token atached to the header");
  }
};
export default authMiddleware;
