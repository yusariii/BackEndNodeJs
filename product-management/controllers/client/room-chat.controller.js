const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
const RoomChat = require("../../models/room-chat.model")

const chatSocket = require("../../sockets/client/chat.socket")

// [GET] /room-chat
module.exports.index = async (req, res) => {
    const roomChatId = req.params.roomChatId

    chatSocket(req, res)    

    const chats = await Chat.find({
        deleted: false,
        room_chat_id: roomChatId
    })

    for (const chat of chats) {
        const user = await User.findById(chat.user_id).select("fullName avatar")
        chat.infoUser = user
    }

    res.render("client/pages/room-chat/index", {
        pageTitle: "Tin nhắn",
        chats: chats
    })
}


// [GET] /room-chat/create
module.exports.create = async (req, res) => {
    const myUser = res.locals.user

    const friendList = myUser.friendList
    
    for (const friend of friendList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id,
            deleted: false
        }).select("fullName avatar")
        friend.infoFriend = infoFriend
    }

    res.render("client/pages/room-chat/create", {
        pageTitle: "Tao phong",
        friendList: friendList
    })
}

module.exports.createPost = async (req, res) => {
    const title = req.body.title
    const userIds = req.body.userIds

    const dataRoom = {
        title: title,
        typeRoom: "group",
        users: []
    }

    for (const userId of userIds) {
        dataRoom.users.push({
            user_id: userId,
            role: "user"
        })
    }

    dataRoom.users.push({
            user_id: res.locals.user.id,
            role: "superAdmin"
        })
}