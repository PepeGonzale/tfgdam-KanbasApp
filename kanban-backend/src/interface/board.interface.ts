import mongoose, { Document } from "mongoose"

export interface Status extends Document{
    name: string,
    color: string
}
export interface SubTask {
    title: string,
    completed: boolean
}
export interface IComment {
    commentBy: import('mongoose').Types.ObjectId,
    comment: string,
}
export interface Task {
    title: string,
    taskNum: number;
    createdBy: mongoose.Types.ObjectId,
    priority: string;
    description: string,
    comments: mongoose.Types.DocumentArray<IComment>
    subtasks: mongoose.Types.DocumentArray<SubTask>,
    status: Status,
    asignedTo: mongoose.Types.ObjectId,
    
}
export interface Role {
    user: mongoose.Types.ObjectId,
    role:string
}

export interface IBoard {
    title: string,
    starred: boolean,
    roles: mongoose.Types.DocumentArray<Role>
    description: string,
    createdBy: mongoose.Types.ObjectId,
    usersWithAccess: [mongoose.Types.ObjectId]
    column: mongoose.Types.DocumentArray<Status>,
    tasks: mongoose.Types.DocumentArray<Task>,
    archivedTasks: mongoose.Types.DocumentArray<Task>
}