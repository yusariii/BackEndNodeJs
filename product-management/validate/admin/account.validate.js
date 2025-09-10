const systemConfig = require("../../config/system")

module.exports.createAccount = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Họ và tên không được để trống!')
        return res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    }
 
    if (req.body.password.length < 8) {
        req.flash('error', 'Mật khẩu phải dài hơn 8 kí tự!')
                return res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    }

    if (req.body.phone.length != 10 || isNaN(parseInt(req.body.phone))) {
        req.flash('error', 'Số điện thoại không hợp lệ!')
                return res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    }

    next()
}