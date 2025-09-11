const express = require("express")
const router = express.Router()
const multer = require('multer')

const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const controller = require("../../controllers/admin/accounts.controller")

const validate = require("../../validate/admin/account.validate")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create", upload.single("avatar"), uploadCloud.upload, validate.createAccount, controller.createAccount)

router.get("/edit/:id", controller.edit)

router.patch("/edit/:id", upload.single("avatar"), uploadCloud.upload, validate.editAccount, controller.editAccount)

router.delete("/delete/:id", controller.deleteAccount)

router.get("/detail/:id", controller.detail)

router.patch("/change-status/:status/:id", controller.changeStatus)

module.exports = router