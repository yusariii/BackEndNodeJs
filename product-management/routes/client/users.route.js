const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/users.controller")
const authMiddleware = require("../../middlewares/client/auth.middleware")


router.get('/all', authMiddleware.requireAuth, controller.all)

router.get('/friends', authMiddleware.requireAuth, controller.friends)

router.get('/request', authMiddleware.requireAuth, controller.request)

router.get('/accept', authMiddleware.requireAuth, controller.accept)

module.exports = router