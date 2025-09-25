const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/settings.controller")

const multer = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/general", controller.general)

router.patch("/general/edit", upload.single("logo"), uploadCloud.upload, controller.editGeneral)

module.exports = router