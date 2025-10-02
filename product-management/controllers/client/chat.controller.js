const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")

const chatSocket = require("../../sockets/client/chat.socket")

// [GET] /chat
module.exports.index = async (req, res) => {

    chatSocket(res)    

    const chats = await Chat.find({
        deleted: false
    })

    for (const chat of chats) {
        const user = await User.findById(chat.user_id).select("fullName avatar")
        chat.infoUser = user
    }

    res.render("client/pages/chat/index", {
        pageTitle: "Tin nhắn",
        chats: chats
    })
}
