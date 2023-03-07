const { createBoard, getBoards, newColumn } = require("../services/board.service")

const getBoard = async (req, res) => {
    const {_id} = req.user
    const fetchBoards = await getBoards(_id) 
    console.log(fetchBoards);
    res.json(fetchBoards)
}

const postBoard = async (req, res) => {
    const {_id} = req.user
    const {title, description} = req.body
    console.log(title,description);
  const payload = {
    title,
    description,
    createdBy: _id
  }
    const newBoard = await createBoard(payload)
    res.json(newBoard)
};
const createColumn = async (req, res) => {
  const {id} = req.params;
  const {name, color} = req.body;
  const {_id} = req.user
  console.log(name, color);
  try {
    const column = await newColumn(id, name, color, _id)
    res.json(column)
  } catch(err) {
    throw new Error(err)
  }
}

module.exports = {
    postBoard,
    getBoard,
    createColumn
}