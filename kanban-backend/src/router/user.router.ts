import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getOneBoard,
    getUser,
    getUserByEmail,
    login,
    logout,
    register,
    updateCUsers,
    updatePassword,
    uploadImage,
    googleCallback,
} from "../controller/user.controller";
import { authMiddleware } from "../utils/authMiddleware";
import passport from "../config/passport";

const router = Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleCallback
);

// Protected
router.post("/logout", authMiddleware, logout);
router.post("/user/image/:bucketId", authMiddleware, uploadImage);
router.post("/user/password", authMiddleware, updatePassword);
router.post("/delete/:userId", authMiddleware, deleteUser);
router.post("/update", authMiddleware, updateCUsers);
router.get("/users", authMiddleware, getAllUsers);
router.get("/find/user", authMiddleware, getUser);
router.get("/find/user/:userEmail", authMiddleware, getUserByEmail);
router.get("/user/board/:boardId", authMiddleware, getOneBoard);

export default router;
