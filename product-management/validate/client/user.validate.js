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

module.exports.loginPost = (req, res, next) => {

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!')
                return res.redirect(`/user/login`)
    }
 
    if (req.body.password != "" && req.body.password.length < 8) {
        req.flash('error', 'Mật khẩu phải dài hơn 8 kí tự!')
                return res.redirect(`/user/login`)
    }

    next()
}