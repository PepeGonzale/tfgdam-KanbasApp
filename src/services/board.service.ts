import Board from "../models/board.model"

const createBoard = async (userId: string, title: string, description: string) => {
    return await Board.create({
        createdBy: userId,
        title,
        description
        
    })
}

export default {
    createBoard
}