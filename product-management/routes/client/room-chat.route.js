const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/room-chat.controller")
const authMiddleware = require("../../middlewares/client/auth.middleware")
const chatMiddleware = require("../../middlewares/client/chat.middleware")

router.get('/', authMiddleware.requireAuth, controller.index)


module.exports = router