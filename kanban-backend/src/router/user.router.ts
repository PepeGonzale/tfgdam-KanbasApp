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
} from "../controller/user.controller";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

// Public
router.post("/register", register);
router.post("/login", login);

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
