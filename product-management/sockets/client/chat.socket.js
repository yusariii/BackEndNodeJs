const Chat = require("../../models/chat.model")
const uploadToCloud = require("../../helpers/uploadToCloud")


module.exports = (req, res) => {
    const userId = res.locals.user.id
    const roomChatId = req.params.roomChatId
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const content = data.content
            let images = [] 

            for (const imageBuffer of data.images) {
                const link = await uploadToCloud(imageBuffer)
                images.push(link)
            }

            // Lưu tin nhắn vào database
            const chat = new Chat({
                user_id: userId,
                content: content,
                room_chat_id: roomChatId,
                images: images
            })
            await chat.save()

            // Phát tin nhắn đến tất cả các client đang kết nối
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                content: content,
                infoUser: {
                    fullName: res.locals.user.fullName,
                    avatar: res.locals.user.avatar
                },
                images: images
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
}