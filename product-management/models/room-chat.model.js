const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    typeRoom: String, // friend, group
    status: String, // lock, only admin....
    users: [
        {
            user_id: String,
            role: String // Super Admin, Admin, User
        }
    ]
}, { timestamps: true })

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "room-chats")

module.exports = RoomChat