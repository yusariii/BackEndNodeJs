
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