import mongoose from "mongoose";
import { Task, SubTask, Status, IBoard } from "../interface/board.interface";



const StatusSchema = new mongoose.Schema<Status>({
  name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
  });
  
  const SubtaskSchema = new mongoose.Schema<SubTask>(
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
  
  const TaskSchema = new mongoose.Schema<Task>(
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
  
  export const BoardSchema = new mongoose.Schema<IBoard>(
    {
      
      title: {
        type: String,
        required: true,
        maxlength: 25,
      },
      description: {
        type: String,
      
      },
      createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }],
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
    },
    { timestamps: true }
  );
  
  const Board = mongoose.model('Board', BoardSchema);
  
export default Board