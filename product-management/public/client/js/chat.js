import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

// CLIENT SEND MESSAGE
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content)
            e.target.elements.content.value = ""
            socket.emit("CLIENT_SEND_TYPING", "hidden")
        }
    })
}
// End CLIENT SEND MESSAGE

// SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const body = document.querySelector(".chat .inner-body")
    const userId = document.querySelector("[my-id]").getAttribute("my-id")
    const boxListTyping = document.querySelector(".chat .inner-typing-list")
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
    body.insertBefore(div, boxListTyping)

    body.scrollTop = body.scrollHeight
})
// End SERVER RETURN MESSAGE

// Scroll to bottom
const chatBody = document.querySelector(".chat .inner-body")
if (chatBody) {
    chatBody.scrollTop = chatBody.scrollHeight
}
// End Scroll to bottom

// Toggle Tooltip
const emojiIcon = document.querySelector('.emoji-icon')
const tooltip = document.querySelector('.tooltip')
Popper.createPopper(emojiIcon, tooltip)

emojiIcon.onclick = () => {
    tooltip.classList.toggle('shown')
}
// End Toggle Tooltip


// Timeout box typing
var timeoutBoxTyping
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show")

    clearTimeout(timeoutBoxTyping)

    timeoutBoxTyping = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden")
    }, 5000);
}
// End Timeout box typing

// Insert emoji

const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
    const inputChat = document.querySelector('.chat .inner-form input[name="content"]')
    emojiPicker.addEventListener('emoji-click', event => {
        const icon = event.detail.unicode
        inputChat.value += icon

        const end = inputChat.value.length
        inputChat.setSelectionRange(end, end)
        inputChat.focus()

        showTyping()
    })
}
// End Insert emoji

// Close tooltip when click outside
document.addEventListener('click', function (event) {
    if (!emojiIcon.contains(event.target) && !tooltip.contains(event.target)) {
        tooltip.classList.remove('shown');
    }
});
// End Close tooltip when click outside

// Typing
const inputChat = document.querySelector('.chat .inner-form input[name="content"]')
if (inputChat) {
    inputChat.addEventListener("keyup", () => {
        showTyping()
    })
}
// End Typing

// SERVER RETURN TYPING
const elementListTyping = document.querySelector(".chat .inner-typing-list")
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.type == "show") {
            const existTyping = elementListTyping.querySelector(`[user-id="${data.user_id}"]`)
            if (!existTyping) {
                const body = document.querySelector(".chat .inner-body")
                const boxTyping = document.createElement("div")
                boxTyping.setAttribute("user-id", data.user_id)
                boxTyping.classList.add("box-typing")

                boxTyping.innerHTML = `
                <div class="inner-info">
                    <img src="${(data.infoUser.avatar) ? data.infoUser.avatar : '/client/image/avatar_default.jpg'}" alt ="${data.infoUser.fullName}"/>
                    <span class="inner-name"> ${data.infoUser.fullName} </span>
                </div>
                <div class="inner-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `
                elementListTyping.appendChild(boxTyping)
                body.scrollTop = body.scrollHeight
            }
        } else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.user_id}"]`)
            if (boxTypingRemove) {
                elementListTyping.removeChild(boxTypingRemove)
            }
        }
    })
}