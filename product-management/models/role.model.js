const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const Role = mongoose.model("Role", roleSchema, "roles")
// Product -> Ten Model
// productSchema -> Schema
// products -> Bang products trong Database

module.exports = Role