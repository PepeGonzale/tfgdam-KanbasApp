import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./authMiddleware";

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err:any,req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode==200 ? 500: res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: err.stack
  });
};

const myRouteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // some code that may throw an error
    throw new Error('Something went wrong');
  } catch (err) {
    next(err); // pass the error to the error handler middleware
  }
};

export {
  errorHandler,
  notFound,
  myRouteHandler
};
