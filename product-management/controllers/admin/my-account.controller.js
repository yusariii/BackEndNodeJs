const Account = require("../../models/account.model")
const systemConfig = require("../../config/system")
const md5 = require("md5")

// [GET] /admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Thông tin cá nhân"
    })
}

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    })
}

// [PATCH] /admin/my-account/edit
module.exports.editAccount = async (req, res) => {
    try {
        const id = res.locals.user.id
        const emailExist = await Account.findOne({
            _id: { $ne: id },
            email: req.body.email,
            deleted: false
        })
        if (emailExist) {
            req.flash('error', `Email ${req.body.email} đã tồn tại`)
            const backURL = req.get('Referer')
            return res.redirect(backURL)
        }
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password
        }
        await Account.updateOne({ _id: id }, req.body)
        req.flash('success', 'Cập nhật tài khoản thành công!')
    } catch (error) {
        console.log(error)
        req.flash('error', 'Cập nhật tài khoản thất bại! Vui lòng thử lại sau.')
    }
    res.redirect(`${systemConfig.prefixAdmin}/my-account`)
}