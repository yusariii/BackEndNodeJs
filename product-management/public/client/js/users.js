
// "CLIEND_ADD_FRIEND_SEND"
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]")
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add")

            const userId = button.getAttribute("btn-add-friend")

            socket.emit("CLIEND_ADD_FRIEND_SEND", userId)
        })
    })
}
// End "CLIEND_ADD_FRIEND_SEND"

// "CLIEND_CANCEL_FRIEND_SEND"
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]")
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add")

            const userId = button.getAttribute("btn-cancel-friend")

            socket.emit("CLIEND_CANCEL_FRIEND_SEND", userId)
        })
    })
}
// End "CLIEND_CANCEL_FRIEND_SEND"

// "CLIEND_REFUSE_FRIEND_SEND"
const refuseFriend = (button) => {
    button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("refuse")

        const userId = button.getAttribute("btn-friend-refuse")

        socket.emit("CLIEND_REFUSE_FRIEND_SEND", userId)
    })
}

const listBtnRefuseFriend = document.querySelectorAll("[btn-friend-refuse]")
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        refuseFriend(button)
    })
}
// End "CLIEND_REFUSE_FRIEND_SEND"


// "CLIEND_ACCEPT_FRIEND_SEND"
const acceptFriend = (button) => {
    button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("accepted")

        const userId = button.getAttribute("btn-friend-accept")

        socket.emit("CLIEND_ACCEPT_FRIEND_SEND", userId)
    })
}
const listBtnAcceptFriend = document.querySelectorAll("[btn-friend-accept]")
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        acceptFriend(button)
    })
}
// End "CLIEND_ACCEPT_FRIEND_SEND"

// "SERVER_RETURN_ACCEPT_FRIEND_LENGTH"
const badgeAcceptFriendsLength = document.querySelector("[badge-accept-friend]")
if (badgeAcceptFriendsLength) {
    const userId = badgeAcceptFriendsLength.getAttribute("badge-accept-friend")
    socket.on("SERVER_RETURN_ACCEPT_FRIEND_LENGTH", (data) => {
        if (userId == data.userId) {
            badgeAcceptFriendsLength.innerHTML = `${data.acceptFriendsLength}`
        }
    })
}

// End "SERVER_RETURN_ACCEPT_FRIEND_LENGTH"

// "SERVER_RETURN_ACCEPT_FRIEND_INFO"
socket.on("SERVER_RETURN_ACCEPT_FRIEND_INFO", (data) => {
    // Xử lí trang lời mời đã nhận (Hiển thị lời mời của A trong lời mời đã nhận của B khi A gửi)
    const dataUsersAccept = document.querySelector("[data-users-accept]")
    if (dataUsersAccept) {
        const userId = dataUsersAccept.getAttribute("data-users-accept")
        if (userId == data.userId) {
            const div = document.createElement("div")
            div.classList.add("col-6")
            div.setAttribute("user-send-id", data.infoUserA._id)
            div.innerHTML = `
                <div class="box-user">
                    <div class="inner-avatar">
                        <img
                        src="${data.infoUserA.avatar ? data.infoUserA.avatar : '/client/image/avatar_default.jpg'}"
                        alt="${data.infoUserA.fullName}"
                        />
                    </div>
                <div class="inner-info">
                    <div class="inner-name">${data.infoUserA.fullName}</div>
                    <div class="inner-buttons">
                    <button
                        class="btn btn-sm btn-primary me-1"
                        btn-friend-accept="${data.infoUserA._id}"
                    >
                        Chấp nhận
                    </button>
                    <button
                        class="btn btn-sm btn-secondary"
                        btn-friend-refuse="${data.infoUserA._id}"
                    >
                        Xóa
                    </button>
                    <button
                        class="btn btn-sm btn-secondary"
                        btn-friend-deleted
                        disabled
                    >
                        Đã xóa
                    </button>
                    <button
                        class="btn btn-sm btn-primary"
                        btn-friend-accepted
                        disabled
                    >
                        Đã chấp nhận
                    </button>
                    </div>
                </div>
                </div>
            `
            dataUsersAccept.appendChild(div)

            const buttonRefuse = div.querySelector("[btn-friend-refuse]")
            refuseFriend(buttonRefuse)

            const buttonAccept = div.querySelector("[btn-friend-accept]")
            acceptFriend(buttonAccept)
        }
    }

    // Xử lí trang tất cả (Xóa A trong trang tất cả của B khi A gửi)
    const dataUsersAll = document.querySelector("[data-users-all]")
    if (dataUsersAll) {
        const userId = dataUsersAll.getAttribute("data-user-all")
        if (userId == data.userId) {
            const boxUserRemove = dataUsersAll.querySelector(`[user-send-id='${data.infoUserA._id}']`)
            if (boxUserRemove) {
                dataUsersAll.removeChild(boxUserRemove)
            }
        }
    }
})


// End "SERVER_RETURN_ACCEPT_FRIEND_INFO"

// "SERVER_RETURN_CANCEL_FRIEND_INFO"
socket.on("SERVER_RETURN_CANCEL_FRIEND_INFO", (data) => {
    const userIdA = data.userIdA
    const boxUserRemove = document.querySelector(`[user-send-id='${userIdA}']`)
    if (boxUserRemove) {
        const dataUsersAccept = document.querySelector("[data-users-accept]")
        if (dataUsersAccept) {
            const userIdB = dataUsersAccept.getAttribute("data-users-accept")
            if (userIdB == data.userIdB) {
                dataUsersAccept.removeChild(boxUserRemove)
            }
        }
    }
})
// End "SERVER_RETURN_CANCEL_FRIEND_INFO"


// "SERVER_RETURN_USER_ONLINE"
socket.on("SERVER_RETURN_USER_STATUS", (data) => {
    const dataUsersFriend = document.querySelector('[data-users-friend]')
    if(dataUsersFriend){
        const friendBox = dataUsersFriend.querySelector(`[friend-id='${data.userId}']`)
        if (friendBox){
            friendBox.querySelector("[status]").setAttribute("status", data.status)
        }
    }
})
// End "SERVER_RETURN_USER_ONLINE"