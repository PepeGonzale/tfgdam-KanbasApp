const {Router} = require('express')
const { postBoard, getBoard, createColumn } = require('../controllers/board.controller')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = Router()

router.post("/column/:id",authMiddleware, createColumn)
router.post("/",authMiddleware, postBoard)

router.get("/boards",authMiddleware, getBoard)

module.exports =router