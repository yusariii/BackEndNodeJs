const User = require("../../models/user.model")

const usersSocket = require("../../sockets/client/users.socket")

module.exports.all = async (req, res) => {

    usersSocket(res)

    const userId = res.locals.user.id
    const users = await User.find({
        deleted: false,
        status: "active",
        _id: { $ne: userId }
    }).select("id fullName avatar")
    res.render("client/pages/users/all", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}

module.exports.friends = async (req, res) => {
    res.render("client/pages/users/friends", {
        pageTitle: "Danh sách bạn bè"
    })
}

module.exports.request = async (req, res) => {
    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi"
    })
}

module.exports.accept = async (req, res) => {
    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời kết bạn"
    })
}