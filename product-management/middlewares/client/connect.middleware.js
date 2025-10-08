const User = require("../../models/user.model")

module.exports.connect = async (req, res, next) => {
    _io.once('connection', (socket) => {
        socket.on('disconnect', () => {

        })
    })
    next()
}