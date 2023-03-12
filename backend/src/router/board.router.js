const {Router} = require('express')
const { postBoard, getBoard, createColumn } = require('../controllers/board.controller')
const { postTask, deleteTask, updateTask } = require('../controllers/task.controller')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = Router({mergeParams:true})
router.post("/task/:id",authMiddleware, postTask)
router.post("/column/:id",authMiddleware, createColumn)
router.post("/",authMiddleware, postBoard)
router.post("/task/update/:taskId", authMiddleware, updateTask)
router.post("/task/delete/:taskId", authMiddleware, deleteTask)

router.get("/boards",authMiddleware, getBoard)

module.exports =router