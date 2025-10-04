const User = require("../../models/user.model")


module.exports = (res) => {
    _io.once('connection', (socket) => {
        // Chuc nang gui yeu cau
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


        // Chuc nang huy yeu cau
        socket.on("CLIEND_CANCEL_FRIEND_SEND", async (userId) => {
            const myUserId = res.locals.user.id

            // Xoa id cua A trong acceptFriends cua B
            const existIdAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })

            if(existIdAinB){
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {acceptFriends: myUserId}
                })
            }

            // Xoa id cua B trong requestFriends cua A
            const existIdBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            })

            if(existIdBinA){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {requestFriends: userId}
                })
            }
        })

        // Chuc nang tu choi loi moi ket ban
        socket.on("CLIEND_REFUSE_FRIEND_SEND", async (userId) => {
            const myUserId = res.locals.user.id

            // Xoa id cua B trong acceptFriends cua A
            const existIdBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            })

            if(existIdBinA){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {acceptFriends: userId}
                })
            }

            // Xoa id cua A trong requestFriends cua B
            const existIdAinB = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            })

            if(existIdBinA){
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {requestFriends: myUserId}
                })
            }
        })

        // Chuc nang chap nhan loi moi ket ban
        socket.on("CLIEND_ACCEPT_FRIEND_SEND", async (userId) => {
            const myUserId = res.locals.user.id

            // Xoa id cua B trong acceptFriends cua A
            // Them id cua B vao friendList cua A
            const existIdBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            })

            if(existIdBinA){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            userId: userId,
                            room_chat_id: ""
                        }
                    },
                    $pull: {acceptFriends: userId}
                })
            }

            // Xoa id cua A trong requestFriends cua B
            const existIdAinB = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            })

            if(existIdBinA){
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            userId: myUserId,
                            room_chat_id: ""
                        }
                    },
                    $pull: {requestFriends: myUserId}
                })
            }
        })
    });
}