const mongoose = require("mongoose");
const generateTokenHelper = require("../helpers/generateToken")
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    address: String,
    phone: String,
    avatar: String,
    requestFriends: Array, // Loi moi da gui
    acceptFriends: Array, // Loi moi da nhan
    friendList: [
        {
            user_id: String,
            room_chat_id: String
        }
    ],
    tokenUser: {
        type: String,
        default: generateTokenHelper.generateToken(20)
    },
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const User = mongoose.model("User", userSchema, "users")

module.exports = User