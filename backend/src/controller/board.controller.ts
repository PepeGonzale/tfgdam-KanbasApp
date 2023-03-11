import { Response } from "express";
import { IAuthorizedUserRequest } from "../middleware/auth.middleware";
import services from "../services/board.service";


const getBoard = async (req:IAuthorizedUserRequest, res: Response) => {
    if (req.user){
    const fetchBoards = await services.getBoards(req.user?._id) 
    console.log(fetchBoards);
    res.json(fetchBoards)
    }
    else {
        console.log("mal");
        
    }
}

const postBoard = async (req:IAuthorizedUserRequest, res:Response) => {
   
    const {title, description} = req.body
    console.log(title,description);
  const payload = {
    title,
    description,
    createdBy: req.user?._id
  }
  if (req.user) {
    const newBoard = await services.createBoard(payload)
    res.json(newBoard)
  }
};
const createColumn = async (req:IAuthorizedUserRequest, res:Response) => {
  const {id} = req.params;
  const {name, color} = req.body;
  
  try {
    if (req.user) {
    const column = await services.newColumn(id, name, color, req.user._id)
    res.json(column)
    }
  } catch(err) {
    throw new Error(err)
  }
}
const postTask = async(req:IAuthorizedUserRequest, res:Response) => {
  const {id} = req.params
  const {title, description, status} = req.body
  try {
    if (req.user) {
  const tarea = await services.createTask(id, title, description,status, req.user._id)
  res.json(tarea)
    }
  } catch(err) {
    throw new Error(err)
  }
}
const boardController =  {
    getBoard,
    createColumn,
    postBoard,
    postTask
    
}

export default boardController