import { NextFunction, Response } from "express";
import Board from "../models/board.model";
import { AuthRequest } from "./authMiddleware";

const useRole = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const { boardId } = req.params;

        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ error: "Board not found" });

        const isMember = board.usersWithAccess.some(
            (e) => e.toString() === _id.toString()
        );
        if (!isMember) return res.status(403).json({ error: "You don't have access to this board" });

        const role = board.roles.find(
            (e) =>
                e.user.toString() === _id.toString() &&
                (e.role === "Admin" || e.role === "Write")
        );
        if (!role) return res.status(403).json({ error: "You don't have write access to this board" });

        next();
    } catch (err) {
        next(err);
    }
};

export { useRole };
