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

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteProductsCategory)

router.get("/edit/:id", controller.edit)

router.patch("/edit/:id", upload.single("thumbnail"), uploadCloud.upload, validate.createProductsCategory, controller.editProductsCategory)

router.get("/detail/:id", controller.detail)


module.exports = router