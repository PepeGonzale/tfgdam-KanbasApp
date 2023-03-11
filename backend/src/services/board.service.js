const Board = require('../models/board.model')

const createBoard = async (data) => {
    
    const board = await Board.create(data)
    return board
}
const getBoards = async (id) => {
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
const createTask = async (boardId, title, description, status, userId) => {
    const checkTask = await Board.findOne({
        _id: boardId,
        createdBy: userId
    })
    
    if (!checkTask) throw new Error(`We can not create this task because the board that you are trying to implement this task not exists`)
    
    checkTask.tasks.push({
        title: title,
        description: description,
        status
    })
    checkTask.save()
    return checkTask
}
module.exports = {
    createBoard,
    getBoards,
    newColumn,
    createTask
}