const mongoose = require("mongoose");
const generateTokenHelper = require("../helpers/generateToken")
const roleSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    token: {
        type: String,
        default: generateTokenHelper.generateToken(20)
    },
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const Account = mongoose.model("Account", roleSchema, "accounts")

module.exports = Account