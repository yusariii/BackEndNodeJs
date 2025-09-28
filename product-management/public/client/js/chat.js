// CLIENT SEND MESSAGE
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content)
            e.target.elements.content.value = ""
        }
    })
}
// End CLIENT SEND MESSAGE

// SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const body = document.querySelector(".chat .inner-body")
    const userId = document.querySelector("[my-id]").getAttribute("my-id")
    const div = document.createElement("div")
    div.classList.add((data.user_id == userId ? 'inner-outgoing' : 'inner-incoming'))
    div.innerHTML = `
        ${data.user_id != userId ? `
            <div class="inner-info">
                <img src="${(data.infoUser.avatar) ? data.infoUser.avatar : '/client/image/avatar_default.jpg'}" alt ="${data.infoUser.fullName}"/>
                <span class="inner-name"> ${data.infoUser.fullName} </span>
            </div>` : ""}
        <div class="inner-content"> 
            ${data.content}
        </div>
    `
    body.appendChild(div)
})