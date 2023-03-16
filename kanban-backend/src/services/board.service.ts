import { IBoard } from "../interface/board.interface"
import Board from "../models/board.model"


const createBoard = async (data): Promise<IBoard> => {
    const board = await Board.create(data)
    console.log(board);
    
    return board
}
const getBoards = async (id:string):Promise<IBoard[]>  => {
    const getUserBoards = await Board.find({
        createdBy: id
    })
    return getUserBoards
}
const newColumn = async (boardId, name, color, userId) => {
    // Comprobar que exista la tabla con el usuario 
    const board = await Board.findOne({
        _id:boardId, 
        createdBy: userId
    })
    if(!board) throw new Error(`This board not exist`)
    if (board.column.map((e) => e.name.toLowerCase()).includes(name.toLowerCase())) {
        throw new Error("This column already exist")
    }
    board.column.push({
        name: name.toLowerCase()
        , color})
    board.save();
    return board
}

export {
    createBoard,
    getBoards,
    newColumn,
}