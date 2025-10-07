const User = require("../../models/user.model")

const usersSocket = require("../../sockets/client/users.socket")

module.exports.all = async (req, res) => {

    usersSocket(res)

    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const requestFriends = myUser.requestFriends
    const acceptFriends = myUser.acceptFriends
    const friendList = myUser.friendList
    const friendListId = friendList.map(item => item.user_id)

    const users = await User.find({
        deleted: false,
        status: "active",
        $and: [
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } },
            { _id: { $nin: friendListId } },
            { _id: { $ne: userId } }
        ]
    }).select("id fullName avatar")

    res.render("client/pages/users/all", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}

module.exports.friends = async (req, res) => {
    usersSocket(res)

    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const friendList = myUser.friendList
    const friendListId = friendList.map(item => item.user_id)

    const users = await User.find({
        deleted: false,
        status: "active",
        _id: { $in: friendListId }
    }).select("id fullName avatar statusOnline")

    res.render("client/pages/users/friends", {
        pageTitle: "Danh sách bạn bè",
        users: users
    })
}

module.exports.request = async (req, res) => {
    usersSocket(res)

    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const requestFriends = myUser.requestFriends

    const users = await User.find({
        deleted: false,
        status: "active",
        _id: { $in: requestFriends }
    }).select("id fullName avatar")

    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi",
        users: users
    })
}

module.exports.accept = async (req, res) => {

    usersSocket(res)

    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const acceptFriends = myUser.acceptFriends

    const users = await User.find({
        deleted: false,
        status: "active",
        _id: { $in: acceptFriends }
    }).select("id fullName avatar")


    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời kết bạn",
        users: users
    })
}