import { Response } from "express";
import {
  archiveTask,
  archiveTaskSearch,
  boardToUser,
  createBoard,
  deleteArchive,
  deleteBoard,
  deleteColumn,
  findBoard,
  getBoards,
  inputSearch,
  listArchivedTasks,
  newColumn,
  restoreTask,
  starProject,
  updateBoard,
  updateColumn,
} from "../services/board.service";
import { AuthRequest } from "../utils/authMiddleware";
import validateMongoDbID from "../utils/validateMongoDbId";

const getBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { _id } = req.user;
    validateMongoDbID(_id);
    const boards = await getBoards(_id);
    res.json(boards);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const board = await findBoard(boardId);
    res.json(board);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const patchBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const { _id } = req.user;
    const board = await updateBoard(boardId, _id, req.body);
    res.json(board);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const removeBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const { _id } = req.user;
    const result = await deleteBoard(boardId, _id);
    res.json(result);
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};

const starredProject = async (req: AuthRequest, res: Response) => {
  try {
    const { _id } = req.user;
    const { boardId } = req.params;
    const { starred } = req.body;
    const star = await starProject(_id, boardId, starred);
    res.json(star);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const postBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { _id } = req.user;
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const payload = {
      title,
      description,
      createdBy: _id,
      usersWithAccess: [_id],
      roles: [{ user: _id, role: "Admin" }],
    };
    const board = await createBoard(payload);
    res.status(201).json(board);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const asignUser = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, userId } = req.params;
    const { payload } = req.body;
    const result = await boardToUser(boardId, userId, payload);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const removeColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, columnId } = req.params;
    const column = await deleteColumn(boardId, columnId);
    res.json(column);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const createColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const { _id } = req.user;
    const column = await newColumn(boardId, req.body, _id);
    res.status(201).json(column);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const editColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, columnId } = req.params;
    const result = await updateColumn(boardId, columnId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const search = async (req: AuthRequest, res: Response) => {
  try {
    const { search } = req.query;
    const { boardId } = req.params;
    const result = await inputSearch(boardId, search);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const archiveTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await archiveTask(boardId, taskId);
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const listArchived = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const data = await listArchivedTasks(boardId);
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const restoredTask = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await restoreTask(boardId, taskId);
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const searchArchived = async (req: AuthRequest, res: Response) => {
  try {
    const { archivedSearch } = req.query;
    const { boardId } = req.params;
    const result = await archiveTaskSearch(boardId, archivedSearch);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteArchiveTask = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await deleteArchive(boardId, taskId);
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const boardController = {
  starredProject,
  getBoard,
  postBoard,
  patchBoard,
  removeBoardById,
  editColumn,
  createColumn,
  asignUser,
  removeColumn,
  getBoardById,
  search,
  archiveTasks,
  listArchived,
  restoredTask,
  deleteArchiveTask,
  searchArchived,
};

export default boardController;
