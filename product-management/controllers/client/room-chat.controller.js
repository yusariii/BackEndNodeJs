const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")

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
