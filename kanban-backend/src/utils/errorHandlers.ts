import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err?.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export { errorHandler, notFound };
