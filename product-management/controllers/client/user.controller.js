const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgot-password.model")
const md5 = require("md5")

const generateOTPHelper = require("../../helpers/generateOTP")
const sendMailHelper = require("../../helpers/sendMail")

// [GET] /user/register
module.exports.register = async (req, res) => {
    if (req.locals.user) {
        res.redirect("/")
    } else {
        res.render("client/pages/user/register", {
            pageTitle: "Đăng ký"
        })
    }
}


// [POST] /user/register
module.exports.registerPost = async (req, res) => {

    const existEmail = await User.findOne({
        email: req.body.email
    })
    if (existEmail) {
        req.flash("error", `Email ${req.body.email} đã tồn tại!`)
        const backURL = req.get('Referer')
        res.redirect(backURL)
        return
    }

    req.body.password = md5(req.body.password)

    const user = new User(req.body)
    await user.save()

    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/")
}


// [GET] /user/login
module.exports.login = async (req, res) => {
    if (req.locals.user) {
        res.redirect("/")
    } else {
        res.render("client/pages/user/login", {
            pageTitle: "Đăng nhập"
        })
    }
}


// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        req.flash("error", "Email hoặc mật khẩu không chính xác!")
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    if (md5(password) != user.password) {
        req.flash("error", "Email hoặc mật khẩu không chính xác!")
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa")
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/")
}


// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}


// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {

    res.render("client/pages/user/forgot-password", {
        pageTitle: "Quên mật khẩu"
    })

}


// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        req.flash("error", "Email không tồn tại!")
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    const otp = generateOTPHelper.generateOTP(6)

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword)
    forgotPassword.save()

    const subject = "Mã OTP xác minh lấy lại mật khẩu"
    const html = `
        Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút.
    `

    sendMailHelper.sendMail(email, subject, html)

    res.redirect(`/user/password/otp?email=${email}`)

}


// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email
    res.render("client/pages/user/otp-password", {
        pageTitle: "OTP",
        email: email
    })
}


// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })


    if (!result) {
        req.flash("error", "Mã OTP không hợp lệ!")
        const backURL = req.get('Referer')
        return res.redirect(backURL)
    }

    const user = await User.findOne({
        email: email
    })

    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/user/password/reset")
}


// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    })
}


// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password
    const tokenUser = req.cookies.tokenUser

    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    })

    res.redirect("/")

}


// [GET] /user/info
module.exports.info = async (req, res) => {

    if (res.locals.user) {
        res.render("client/pages/user/info", {
            pageTitle: "Thông tin tài khoản",
            user: res.locals.user
        })
    } else {
        res.redirect("/")
    }
}


// [GET] /user/info/edit
module.exports.infoEdit = async (req, res) => {

    if (res.locals.user) {
        res.render("client/pages/user/edit-info", {
            pageTitle: "Chỉnh sửa tài khoản",
            user: res.locals.user
        })

    } else {
        res.redirect("/")
    }
}


// [PATCH] /user/info/edit
module.exports.infoEditPatch = async (req, res) => {
    if (res.locals.user) {
        const tokenUser = req.cookies.tokenUser
        const emailExist = await User.findOne({
            tokenUser: { $ne: tokenUser },
            email: req.body.email,
            deleted: false,
            status: "active"
        })
        if (emailExist) {
            req.flash('error', `Email ${req.body.email} đã tồn tại`)
            const backURL = req.get('Referer')
            return res.redirect(backURL)
        }

        const phoneExist = await User.findOne({
            tokenUser: { $ne: tokenUser },
            phone: req.body.phone,
            deleted: false,
            status: "active"
        })
        if (phoneExist) {
            req.flash('error', `Email ${req.body.email} đã tồn tại`)
            const backURL = req.get('Referer')
            return res.redirect(backURL)
        }

        await User.updateOne({ tokenUser: tokenUser }, req.body)
        req.flash('success', 'Cập nhật tài khoản thành công!')
        res.redirect(`/user/info`)
    } else {
        res.redirect(`/`)
    }

}