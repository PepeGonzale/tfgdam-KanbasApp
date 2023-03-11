import mongoose from "mongoose";
import { IBoard, IStatus, ISubtask, ITask } from "../interface/board.interface";

const StatusSchema = new mongoose.Schema<IStatus>({
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
  });
  
  const SubtaskSchema = new mongoose.Schema<ISubtask>(
    {
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  
  const TaskSchema = new mongoose.Schema<ITask>(
    {
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
    },
    { timestamps: true }
  );
  
  const BoardSchema = new mongoose.Schema<IBoard>(
    {
      title: {
        type: String,
        required: true,
        maxlength: 25,
      },
      description: {
        type: String,
        minlength: 3,
        maxlength: 100,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      column: {
        type: [
          {
            name: {
              type: String,
              required: true,
              minlength: [3, 'Column name must be more than 2 characters'],
            },
            color: String,
          },
        ],
      },
      tasks: {
        type: [TaskSchema],
      },
    },
    { timestamps: true }
  );
  
  const Board = mongoose.model('Board', BoardSchema);
  
  export default Board;