const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/chat.controller")
const authMiddleware = require("../../middlewares/client/auth.middleware")

router.get('/:roomChatId', authMiddleware.requireAuth, controller.index)


module.exports = router