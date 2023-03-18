import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./authMiddleware";

const notFound = async (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found: ${req.originalUrl}`)
    res.status(404)
    next(error)
}
const errorHandler = (err:any,req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode==200 ? 500: res.statusCode;
    res.status(statusCode)
    res.json({
        message: err?.message,
        stack: err.stack
    });
    };
export {
    errorHandler,
    notFound
}