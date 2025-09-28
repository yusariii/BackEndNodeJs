const User = require("../../models/user.model")

module.exports.requireAuth = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password")

        if (user) {
            next()
        } else {
            return res.redirect('/')
        }
    }
    else {
        return res.redirect('/user/login')
    }
}