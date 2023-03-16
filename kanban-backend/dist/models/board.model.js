"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StatusSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '',
    },
});
const SubtaskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const TaskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
    },
    subtasks: {
        type: [SubtaskSchema],
    },
    status: {
        type: StatusSchema,
        required: true,
    },
}, { timestamps: true });
const BoardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 25,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    column: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                color: String,
            },
        ],
    },
    tasks: {
        type: [TaskSchema],
    },
}, { timestamps: true });
const Board = mongoose_1.default.model('Board', BoardSchema);
exports.default = Board;
//# sourceMappingURL=board.model.js.map