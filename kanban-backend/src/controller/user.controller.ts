import { Request, Response } from "express";
import {
    changeUserPassword,
    deleteUserId,
    getIUser,
    getUsers,
    loginUser,
    logoutUser,
    registerUser,
    saveImage,
    searchByBoardId,
    searchUserEmail,
    updateUser,
} from "../services/user.service";
import { FileArray } from "express-fileupload";
import { AuthRequest } from "../utils/authMiddleware";
import validateMongoDbID from "../utils/validateMongoDbId";
import { uploadToBucket } from "../utils/s3";
import { createJwt } from "../utils/createJwt";
import config from "../config/config";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role, mobile, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, error: "Email, password, and username are required" });
        }
        const user = await registerUser({ email, password, role, username, mobile });
        res.status(201).json({ success: true, error: null, user });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }
        const user = await loginUser(email, password);
        res.json({ success: true, error: null, user });
    } catch (err: any) {
        res.status(401).json({ success: false, error: err.message });
    }
};

const logout = async (req: AuthRequest, res: Response) => {
    try {
        await logoutUser(req.user._id);
        res.json({ success: true });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const allUsers = await getUsers();
        res.json(allUsers);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const getUserByEmail = async (req: AuthRequest, res: Response) => {
    try {
        const { userEmail } = req.params;
        const user = await searchUserEmail(userEmail);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const updateCUsers = async (req: AuthRequest, res: Response) => {
    try {
        const { _id } = req.user;
        const updated = await updateUser(_id, req.body);
        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;
        validateMongoDbID(userId);

        const callerId = req.user._id.toString();
        if (callerId !== userId) {
            return res.status(403).json({ error: "You can only delete your own account" });
        }

        const deleted = await deleteUserId(userId);
        res.json(deleted);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const getUser = async (req: AuthRequest, res: Response) => {
    try {
        const email = req.query["email"];
        if (typeof email !== "string") return res.status(400).json({ error: "Email query param required" });
        const regex = new RegExp(escapeRegex(email), "i");
        const users = await getIUser(regex);
        res.json(users);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const getOneBoard = async (req: AuthRequest, res: Response) => {
    try {
        const { _id } = req.user;
        const { boardId } = req.params;
        const board = await searchByBoardId(_id, boardId);
        res.json(board);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

interface CustomRequest extends AuthRequest {
    files?: FileArray;
}

const uploadImage = async (req: CustomRequest, res: Response) => {
    try {
        const { bucketId } = req.params;
        if (!req.files?.image) return res.status(400).json({ error: "No image file provided" });
        const result = await uploadToBucket(bucketId, req.files.image);
        const location = (result as any).Location;
        // Use the authenticated user's ID — never trust req.body for this
        const updated = await saveImage(req.user._id, location);
        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const updatePassword = async (req: AuthRequest, res: Response) => {
    try {
        // Use authenticated user's ID — ignore any userId param to prevent IDOR
        const userId = req.user._id.toString();
        const result = await changeUserPassword(req.body, userId);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

const googleCallback = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user as any;
        const token = await createJwt(user);
        const params = new URLSearchParams({
            token,
            email: user.email,
            username: user.username,
            imageUrl: user.image || "",
            _id: user._id.toString(),
        });
        res.redirect(`${config.FRONTEND_URL}/auth/callback?${params}`);
    } catch (err: any) {
        res.redirect(`${config.FRONTEND_URL}/login?error=${encodeURIComponent(err.message)}`);
    }
};

export {
    login,
    logout,
    updatePassword,
    register,
    getAllUsers,
    deleteUser,
    updateCUsers,
    getUser,
    getOneBoard,
    uploadImage,
    getUserByEmail,
    googleCallback,
};
