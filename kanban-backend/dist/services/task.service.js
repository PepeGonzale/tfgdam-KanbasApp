"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTask = exports.editTask = exports.createTask = void 0;
const board_model_1 = __importDefault(require("../models/board.model"));
const createTask = (boardId, title, description, status, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const checkTask = yield board_model_1.default.findOne({
        _id: boardId,
        createdBy: userId,
    });
    if (!checkTask)
        throw new Error(`We can not create this task because the board that you are trying to implement this task not exists`);
    checkTask.tasks.push({
        title: title,
        description: description,
        status,
    });
    checkTask.save();
    return checkTask;
});
exports.createTask = createTask;
const editTask = (taskId, taskData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield board_model_1.default.findOne({
        "tasks._id": taskId,
        createdBy: userId,
    });
    if (!board)
        throw new Error(`Task ${taskId} not found`);
    const task = board.tasks.id(taskId);
    task.set(Object.assign(Object.assign({}, taskData), { subtasks: [] }));
    yield board.save();
    return board;
});
exports.editTask = editTask;
const removeTask = (userId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield board_model_1.default.findOneAndUpdate({
            createdBy: userId,
            "tasks._id": taskId,
        }, { $pull: { tasks: { _id: taskId } } }, { new: true } // Return the updated board
        );
        if (!board) {
            console.error("fail");
        }
        return board;
    }
    catch (err) {
        console.error(err);
    }
});
exports.removeTask = removeTask;
//# sourceMappingURL=task.service.js.map