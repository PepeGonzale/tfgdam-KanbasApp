import { IBoard } from "../interface/board.interface"
import Board from "../models/board.model"
import UserModel from "../models/user.model"


const createBoard = async (data) => {
    const {createdBy} = data
    console.log(data)
    const board = new Board(data)
    await board.save()
    return board
}
const getBoards = async (id:string): Promise<IBoard[]>  => {
    const getUserBoards = await Board.find({
        $or: [
            { createdBy: id },
            { usersWithAccess: { $in: [id] } }
          ]
    }).populate("createdBy")
    
    console.log(getUserBoards);
    
    return getUserBoards
}
const boardToUser = async (boardId: string, userId: string, role:string) => {
    /* id del nuevo usuario, id de la board */
    console.log(role)
    const boardUser = await Board.findByIdAndUpdate(boardId, {
        $push: {
            usersWithAccess: userId,
            roles: {
                user: userId,
                role: role
            }
            
        }
    }, {
        new: true
    });
    
    return boardUser;
}

const newColumn = async (boardId, columns, userId) => {
    // Comprobar que exista la tabla con el usuario 
    const board = await Board.findOne({
        _id:boardId, 
        usersWithAccess: userId,
         
    })
    if(!board) throw new Error(`This board not exist`)
    if (board.column.map((e) => e.name.toLowerCase()).includes(columns.name.toLowerCase())) {
        throw new Error("This column already exist")
    }
    board.column.push({
        name: columns.name.toLowerCase()
        , color:columns.color})
    await board.save()
    console.log(board);
    
    return board
}
const deleteColumn = async (boardId, columnId) => {
    const column = await Board.findOne({_id: boardId})
    const taskInColumn = column.tasks.filter((t) => {
        return t.status._id.toString() === column.column.id(columnId)._id.toString()
       
    })
    taskInColumn.map((t) => {
        return t.deleteOne()
    })
     const actualColumn = column.column.id(columnId).deleteOne() 
    
    await column.save()
    
    return column;
} 

export {
    createBoard,
    getBoards,
    newColumn,
    boardToUser,
    deleteColumn
}