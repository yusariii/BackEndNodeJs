
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
const listBtnRefuseFriend = document.querySelectorAll("[btn-friend-refuse]")
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse")

            const userId = button.getAttribute("btn-friend-refuse")

            socket.emit("CLIEND_REFUSE_FRIEND_SEND", userId)
        })
    })
}
// End "CLIEND_REFUSE_FRIEND_SEND"


// "CLIEND_ACCEPT_FRIEND_SEND"
const listBtnAcceptFriend = document.querySelectorAll("[btn-friend-accept]")
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted")

            const userId = button.getAttribute("btn-friend-accept")

            socket.emit("CLIEND_ACCEPT_FRIEND_SEND", userId)
        })
    })
}
// End "CLIEND_ACCEPT_FRIEND_SEND"

// "CLIENT_RETURN_ACCEPT_FRIEND_LENGTH"
const badgeAcceptFriendsLength = document.querySelector("[badge-accept-friend]")
if (badgeAcceptFriendsLength) {
    const userId = badgeAcceptFriendsLength.getAttribute("badge-accept-friend")
    socket.on("CLIENT_RETURN_ACCEPT_FRIEND_LENGTH", (data) => {
        if (userId == data.userId) {
            badgeAcceptFriendsLength.innerHTML = `${data.acceptFriendsLength}`
        }
    })
}

// End "CLIENT_RETURN_ACCEPT_FRIEND_LENGTH"

// "CLIENT_RETURN_ACCEPT_FRIEND_INFO"
const dataUsersAccept = document.querySelector("[data-users-accept]")
if (dataUsersAccept) {
    const userId = dataUsersAccept.getAttribute("data-users-accept")
    socket.on("CLIENT_RETURN_ACCEPT_FRIEND_INFO", (data) => {
        if (userId == data.userId) {
            const div = document.createElement("div")
            div.innerHTML = `
                <div class="col-6">
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
                </div>
            `
            dataUsersAccept.appendChild(div)
        }
    })
}

// End "CLIENT_RETURN_ACCEPT_FRIEND_INFO"