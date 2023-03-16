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
exports.createColumn = exports.postBoard = exports.getBoard = void 0;
const board_service_1 = require("../services/board.service");
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const fetchBoards = yield (0, board_service_1.getBoards)(_id);
    res.json(fetchBoards);
});
exports.getBoard = getBoard;
const postBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { title, description } = req.body;
    const payload = {
        title,
        description,
        createdBy: _id,
    };
    const newBoard = yield (0, board_service_1.createBoard)(payload);
    res.json(newBoard);
});
exports.postBoard = postBoard;
const createColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, color } = req.body;
    const { _id } = req.user;
    console.log(name, color);
    try {
        const column = yield (0, board_service_1.newColumn)(id, name, color, _id);
        console.log(name, color);
        res.json(column);
    }
    catch (err) {
        console.log(err);
    }
});
exports.createColumn = createColumn;
//# sourceMappingURL=board.controller.js.map