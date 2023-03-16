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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.postTask = void 0;
const { createTask, editTask, removeTask, } = require("../services/task.service");
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { _id } = req.user;
    try {
        console.log(status);
        const tarea = yield createTask(id, title, description, status, _id);
        res.json(tarea);
    }
    catch (err) {
        console.log(err);
    }
});
exports.postTask = postTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { title, description, status } = req.body.task;
    const { _id } = req.user;
    console.log(req.body);
    const taskData = {
        title,
        description,
        status,
    };
    try {
        const updateTask = yield editTask(taskId, taskData, _id);
        res.json(updateTask);
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { _id } = req.user;
    try {
        const remove = yield removeTask(_id, taskId);
        res.json(remove);
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map