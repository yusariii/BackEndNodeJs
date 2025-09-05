const express = require('express')
const router = express.Router()
const multer = require('multer')

const controller = require("../../controllers/admin/products-category.controller")
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const validate = require("../../validate/admin/products-category.validate")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create", upload.single("thumbnail"), uploadCloud.upload, validate.createProductsCategory, controller.createProductsCategory)

module.exports = router