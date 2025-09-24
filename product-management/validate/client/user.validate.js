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

module.exports.forgotPasswordPost = (req, res, next) => {

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!')
        return res.redirect(`/user/login`)
    }


    next()
}

module.exports.resetPasswordPost = (req, res, next) => {

    if (req.body.password.length < 8) {
        req.flash('error', 'Mật khẩu phải dài hơn 8 kí tự!')
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    if (req.body.passwordRepeat != req.body.password) {
        req.flash('error', 'Mật khẩu không khớp!')
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }


    next()
}


module.exports.editUser = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Họ và tên không được để trống!')
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!')
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    if (req.body.phone && (req.body.phone.length != 10 || isNaN(parseInt(req.body.phone)))) {
        req.flash('error', 'Số điện thoại không hợp lệ!')
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    next()
}