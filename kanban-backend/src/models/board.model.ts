import mongoose from "mongoose";
import { Task, SubTask, Status, IBoard, IComment } from "../interface/board.interface";



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
  const CommentSchema = new mongoose.Schema<IComment>({
    commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
      required:true
    }
  }, {
    timestamps: true
  })
  const TaskSchema = new mongoose.Schema<Task>(
    {
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      description: {
        type: String,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      subtasks: {
        type: [SubtaskSchema],
      },
      taskNum: {
        type: Number,
        required: true,
        default: 0,
      },
      priority: {
        type: String,
        enum: ["","High", "Medium", "Low"],
        default: "",
      },
      asignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comments: [CommentSchema],
      status: {
        type: StatusSchema,
        required: true,
      },
    },
    { timestamps: true }
  );
  const RoleSchema = new mongoose.Schema({
    userRole: {
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'write', 'read'],
      required: true
    }
  }
  });
  const Task = mongoose.model('Task', TaskSchema);

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
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      usersWithAccess: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      starred: {
        type: Boolean,
        default: false
      },
      roles: {
        type: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
              required: true
            },
            role: {
              type: String,
              enum: ['Admin', 'Write', 'Read'],
            }
          }
        ],
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
      archivedTasks: [{
        type: TaskSchema,
        ref: 'Task'
      }]
    },
    { timestamps: true }
  );
  
  const Board = mongoose.model('Board', BoardSchema);
  
export default Board