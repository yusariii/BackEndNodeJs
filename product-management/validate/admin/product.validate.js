const systemConfig = require("../../config/system")

module.exports.createProduct = (req, res, next) => {
    if (!req.body.title) {
        req.flash('error', 'Tiêu đề không được để trống!')
        return res.redirect(`${systemConfig.prefixAdmin}/products/create`)
    }

    if (!req.body.price || isNaN(req.body.price) || req.body.price < 0) {
        req.flash('error', 'Giá sản phẩm không hợp lệ!')
        return res.redirect(`${systemConfig.prefixAdmin}/products/create`)
    }

    if (req.body.discountPercentage && (isNaN(req.body.discountPercentage) || req.body.discountPercentage < 0 || req.body.discountPercentage > 100)) {
        req.flash('error', 'Phần trăm giảm giá không hợp lệ!')
        return res.redirect(`${systemConfig.prefixAdmin}/products/create`)
    }

    if (!req.body.stock || isNaN(req.body.stock) || req.body.stock < 0) {
        req.flash('error', 'Số lượng không hợp lệ!')
        return res.redirect(`${systemConfig.prefixAdmin}/products/create`)
    }

    if (req.body.position && (isNaN(req.body.position) || req.body.position < 0)) {
        req.flash('error', 'Vị trí không hợp lệ!')
        return res.redirect(`${systemConfig.prefixAdmin}/products/create`)
    }

    next()
}