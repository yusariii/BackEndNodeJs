const SettingsGeneral = require('../../models/settings-general.model')
// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
    const settings = await SettingsGeneral.findOne({})
    if (!settings) {
        const settings = new SettingsGeneral()
        await settings.save()
    }
    res.render("admin/pages/settings-general/index", {
        pageTitle: "Cài đặt chung",
        settings: settings
    })
}



// [PATCH] /admin/settings/general/edit
module.exports.editGeneral = async (req, res) => {
    await SettingsGeneral.updateOne({}, req.body)
    res.redirect("/admin/settings/general")
}