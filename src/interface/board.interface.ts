import mongoose from "mongoose"

export interface Status {
    title: string, 
    color: string
}
export interface SubTasks {
    title: string,
    completed: boolean
}
export interface Task {
    title: string,
    description: string,
    substasks: mongoose.Types.DocumentArray<SubTasks>
    status: Status
}
export interface Board {
    title: string,
    description: string,
    createdBy: mongoose.Types.ObjectId
    column: mongoose.Types.DocumentArray<Status>,
    tasks: mongoose.Types.DocumentArray<Task>
}