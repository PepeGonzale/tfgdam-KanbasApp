import mongoose, { Document } from 'mongoose';

export interface IStatus extends Document {
  name: string;
  color: string;
}

export interface ISubtask {
  title: string;
  completed?: boolean;
}

export interface ITask {
  title: string;
  description: string;
  subtasks: mongoose.Types.DocumentArray<ISubtask>;
  status: IStatus;
}

export interface IBoard {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  column: mongoose.Types.DocumentArray<IStatus>;
  tasks: mongoose.Types.DocumentArray<ITask>;
}

