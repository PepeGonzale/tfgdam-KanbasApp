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
exports.newColumn = exports.getBoards = exports.createBoard = void 0;
const board_model_1 = __importDefault(require("../models/board.model"));
const createBoard = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield board_model_1.default.create(data);
    console.log(board);
    return board;
});
exports.createBoard = createBoard;
const getBoards = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserBoards = yield board_model_1.default.find({
        createdBy: id
    });
    return getUserBoards;
});
exports.getBoards = getBoards;
const newColumn = (boardId, name, color, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Comprobar que exista la tabla con el usuario 
    const board = yield board_model_1.default.findOne({
        _id: boardId,
        createdBy: userId
    });
    if (!board)
        throw new Error(`This board not exist`);
    if (board.column.map((e) => e.name.toLowerCase()).includes(name.toLowerCase())) {
        throw new Error("This column already exist");
    }
    board.column.push({
        name: name.toLowerCase(),
        color
    });
    board.save();
    return board;
});
exports.newColumn = newColumn;
//# sourceMappingURL=board.service.js.map