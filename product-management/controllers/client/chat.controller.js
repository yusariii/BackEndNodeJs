const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")

// [GET] /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id

    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // Lưu tin nhắn vào database
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save()

            // Phát tin nhắn đến tất cả các client đang kết nối
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                content: content,
                infoUser: {
                    fullName: res.locals.user.fullName,
                    avatar: res.locals.user.avatar
                }
            })
        })

        // Nhận sự kiện typing từ client
        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                user_id: userId,
                infoUser: {
                    fullName: res.locals.user.fullName,
                    avatar: res.locals.user.avatar
                },
                type: type
            })
        })
    });

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
