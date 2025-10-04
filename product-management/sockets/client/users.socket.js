const User = require("../../models/user.model")


module.exports = (res) => {
    _io.once('connection', (socket) => {
        socket.on("CLIEND_ADD_FRIEND_SEND", async (userId) => {
            const myUserId = res.locals.user.id

            // Them id cua A vao acceptFriends cua B
            const existIdAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })

            if(!existIdAinB){
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {acceptFriends: myUserId}
                })
            }

            // Them id cua B vao requestFriends cua A
            const existIdBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            })

            if(!existIdBinA){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {requestFriends: userId}
                })
            }
        })
    });
}