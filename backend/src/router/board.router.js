const {Router} = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = Router()


router.post("/",authMiddleware)

module.exports =router