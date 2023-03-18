import mongoose, { Document } from "mongoose"

export interface Status extends Document{
    name: string,
    color: string
}
export interface SubTask {
    title: string,
    completed: boolean
}
export interface Task {
    title: string,
    description: string,
    subtasks: mongoose.Types.DocumentArray<SubTask>,
    status: Status
}

export interface IBoard {
    title: string,
    description: string,
    createdBy: [],
    column: mongoose.Types.DocumentArray<Status>,
    tasks: mongoose.Types.DocumentArray<Task>
}