import { Router } from "express";
import { deleteUser, getAllUsers, getOneBoard, getUser, login, register, tokenAuthenticate, updateCUsers, uploadImage,getUserByEmail, updatePassword } from "../controller/user.controller";
import {authMiddleware} from "../utils/authMiddleware";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.post("/user/image/:bucketId",  uploadImage)
router.post("/user/password/:userId", authMiddleware, updatePassword)
router.post("/delete/:userId", deleteUser)
router.post("/update", authMiddleware,updateCUsers)
router.get("/authenticate/user", tokenAuthenticate)
router.get("/users", getAllUsers)
router.get("/find/user", getUser)
router.get("/find/user/:userEmail", getUserByEmail)
router.get("/user/board/:boardId", authMiddleware, getOneBoard)
export default router