import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/http-exception";


const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    error: message,
  });
};

export default errorHandler;