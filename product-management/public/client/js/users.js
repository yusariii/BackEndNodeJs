
// Gui yeu cau
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]")
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add")

            const userId = button.getAttribute("btn-add-friend")

            socket.emit("CLIEND_ADD_FRIEND_SEND", userId)
        })
    })
}
// End

// Huy gui yeu cau
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]")
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add")

            const userId = button.getAttribute("btn-cancel-friend")

            socket.emit("CLIEND_CANCEL_FRIEND_SEND", userId)
        })
    })
}
// Het huy gui yeu cau

// Tu choi loi moi ket ban
const listBtnRefuseFriend = document.querySelectorAll("[btn-friend-refuse]")
if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse")

            const userId = button.getAttribute("btn-friend-refuse")

            socket.emit("CLIEND_REFUSE_FRIEND_SEND", userId)
        })
    })
}
// Tu choi loi moi ket ban


// Chap nhan loi moi ket ban
const listBtnAcceptFriend = document.querySelectorAll("[btn-friend-accept]")
if(listBtnAcceptFriend.length > 0){
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted")

            const userId = button.getAttribute("btn-friend-accept")

            socket.emit("CLIEND_ACCEPT_FRIEND_SEND", userId)
        })
    })
}
// Chap nhan loi moi ket ban