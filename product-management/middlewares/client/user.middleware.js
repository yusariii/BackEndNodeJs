const User = require("../../models/user.model")

module.exports.infoUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password")

        if (user) {
            res.locals.user = user
            _io.once('connection', (socket) => {
                socket.on('disconnect', async () => {
                    await User.updateOne({
                        _id: user.id
                    }, {
                        statusOnline: "Offline"
                    })
                    socket.broadcast.emit("SERVER_RETURN_USER_STATUS", {
                        userId: user.id,
                        status: "Offline"
                    })
                })
            })
        } else {
            res.clearCookie("tokenUser")
        }
    }
    next()
}