import { NextFunction, Request, Response } from "express";
import { IUserReturnType, IUserType } from "../interface/user.interface";
import UserModel from "../models/user.model";
import HttpException from "../utils/http-exception";
import verifyToken from "../utils/verify-token";

export interface IGetUserAuthInfoRequest extends Request {
    user?: IUserType;
}
  
  export interface IAuthorizedUserRequest extends Request {
    user?: IUserReturnType;
}
export const authMiddleware = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization === null ||
        req.headers.authorization === "" ||
        req.headers.authorization === undefined || 
        !req.headers.authorization.startsWith('Bearer ')) {
            throw new HttpException("Unauthorized", 401);
        }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token); 
    const user = await UserModel.findById(decoded?._id)  
    if (!user) throw new HttpException("Unauthorized", 401);
    req.user = user
    next()
}

export default {authMiddleware}
