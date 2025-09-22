const User = require("../../models/user.model")
const md5 = require("md5")
// [GET] /user/register
module.exports.register = async (req, res) => {
    if (req.cookies.tokenUser) {
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
    if (req.cookies.tokenUser) {
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


// [POST] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}