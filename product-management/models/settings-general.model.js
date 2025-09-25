const mongoose = require("mongoose");
const settingsGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    github: String,
    youtube: String,
    tiktok: String,
}, { timestamps: true })

const SettingsGeneral = mongoose.model("SettingsGeneral", settingsGeneralSchema, "settings-general")

module.exports = SettingsGeneral;