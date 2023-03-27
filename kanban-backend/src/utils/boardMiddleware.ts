import { NextFunction, Response } from "express";
import Board from "../models/board.model";
import { AuthRequest } from "./authMiddleware";

const useRole = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Cogemos el id y el boardId de la request para comprobar que rol tiene el usuario
    const {_id} = req.user;
    const {boardId} = req.params;
    // Hacemos la consulta a la base de datos para ver que exista
    const board = await Board.findById(boardId);
    // Si no existe, devolvemos un error
    if (!board) throw new Error(`Board not found`);
    // Si existe, comprobamos que el usuario tenga acceso a la board
    const user = await board.usersWithAccess.find((e) => e.toString() === _id.toString());
    console.log(user)
    // Si no tiene acceso, devolvemos un error
    if (!user) throw new Error(`You don't have access to this board`);
    // Si tiene acceso, comprobamos que el rol sea el correcto
    const role = await board.roles.find((e) => e.user.toString() === _id.toString() && e.role === "Admin" || e.user.toString() === _id.toString() && e.role === "Write" );
    console.log(role)
    if (!role) throw new Error(`You don't have access to modify this board`);
    // Si todo es correcto, pasamos al siguiente middleware
    next();
  }
  export {useRole}