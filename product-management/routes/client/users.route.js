const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/users.controller")



router.get('/all', controller.all)

router.get('/friends', controller.friends)

router.get('/request', controller.request)

router.get('/accept', controller.accept)

module.exports = router