const systemConfig = require("../../config/system")

module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Họ và tên không được để trống!')
        return res.redirect(`/user/register`)
    }
 
    if (req.body.password.length < 8) {
        req.flash('error', 'Mật khẩu phải dài hơn 8 kí tự!')
                return res.redirect(`/user/register`)
    }

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!')
                return res.redirect(`/user/register`)
    }

    next()
}

module.exports.editAccount = (req, res, next) => {
    const id = req.params.id
    if (!req.body.fullName) {
        req.flash('error', 'Họ và tên không được để trống!')
        return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`)
    }
 
    if (req.body.password != "" && req.body.password.length < 8) {
        req.flash('error', 'Mật khẩu phải dài hơn 8 kí tự!')
                return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`)
    }

    if (req.body.phone.length != 10 || isNaN(parseInt(req.body.phone))) {
        req.flash('error', 'Số điện thoại không hợp lệ!')
                return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`)
    }

    next()
}