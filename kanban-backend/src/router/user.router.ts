import { Router } from "express";
import { deleteUser, getAllUsers, getOneBoard, getUser, login, register, tokenAuthenticate, updateCUsers } from "../controller/user.controller";
import authMiddleware from "../utils/authMiddleware";
import multer from "../utils/multer";
const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get("/authenticate/user", tokenAuthenticate)
router.post("/delete/:userId", deleteUser)
router.post("/update/:userId", updateCUsers)
router.get("/users", getAllUsers)
router.get("/users/:userId", getUser)
router.get("/user/board/:boardId", authMiddleware, getOneBoard)
export default router