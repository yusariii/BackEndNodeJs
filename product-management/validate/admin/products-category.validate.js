const systemConfig = require("../../config/system")

module.exports.createProductsCategory = (req, res, next) => {
    if (!req.body.title) {
        req.flash('error', 'Tiêu đề không được để trống!')
        return res.redirect(`${systemConfig.prefixAdmin}/products-category/create`)
    }

    

    if (req.body.position && (isNaN(req.body.position) || req.body.position < 0)) {
        req.flash('error', 'Vị trí không hợp lệ!')
        return res.redirect(`${systemConfig.prefixAdmin}/products-category/create`)
    }

    next()
}