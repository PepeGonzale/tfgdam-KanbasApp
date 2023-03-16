"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = require("../controller/board.controller");
const task_controller_1 = require("../controller/task.controller");
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/task/:id", task_controller_1.postTask);
router.post("/column/:id", board_controller_1.createColumn);
router.post("/", board_controller_1.postBoard);
router.post("/task/update/:taskId", task_controller_1.updateTask);
router.post("/task/delete/:taskId", task_controller_1.deleteTask);
router.get("/boards", authMiddleware_1.default, board_controller_1.getBoard);
exports.default = router;
//# sourceMappingURL=board.router.js.map