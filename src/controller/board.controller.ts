import { Response } from "express";
import boardService from "../services/board.service";
import { IBoardRequest } from "./requests";


    const postBoard = async (req: IBoardRequest, res: Response) => {
        const {
          user: { userId },
          body: { name, description },
        } = req;
      
        if (!name) throw new Error('Board name is required');
      
        const board = await boardService.createBoard(userId, description, name);
        res.send(200).json({ board });
      };
export default {
    postBoard
}