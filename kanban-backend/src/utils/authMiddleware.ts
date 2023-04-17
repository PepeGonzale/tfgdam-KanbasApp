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
      res.status(401).send({ error: "Not Authorized token expired, please login again"})
    }
  } else {
    res.status(401).send({ error: "There is no token attached to the header" });  }
};
const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const {email} = req.user;
  const adminUser = await UserModel.findOne({
    email: email
  });
  if (adminUser.email !== "admin") throw new Error("You are not an admin")
  else {
    next()
  }
};


export { authMiddleware, isAdmin};
