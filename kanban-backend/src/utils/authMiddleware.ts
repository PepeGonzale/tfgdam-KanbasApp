import UserModel from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { User } from "../interface/user.interface";
import verifyToken from "./verifyToken";

export interface AuthRequest extends Request {
    user: User;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];
    try {
        const decoded = verifyToken(token) as { userId: string };
        const user = await UserModel.findById(decoded.userId).select("-password -refreshToken");
        if (!user) return res.status(401).json({ error: "User not found" });
        req.user = user as unknown as User;
        next();
    } catch {
        res.status(401).json({ error: "Not Authorized — token expired, please login again" });
    }
};

const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
    }
    next();
};

export { authMiddleware, isAdmin };
