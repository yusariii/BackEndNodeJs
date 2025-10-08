

// Show Alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = showAlert.getAttribute("data-time")
    const closeAlert = showAlert.querySelector("[close-alert]")

    if (closeAlert) {
        closeAlert.addEventListener("click", () => {
            showAlert.classList.add("alert-hidden")
            showAlert.addEventListener("animationend", () => {
                showAlert.style.display = "none"
            }, { once: true })
        })
    }

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
        showAlert.addEventListener("animationend", () => {
            showAlert.style.display = "none"
        }, { once: true })
    }, parseInt(time))
}
// End Show Alert

// Reset Form
const resetButton = document.querySelector("[reset-button]")
const formEditUser = document.querySelector("#form-edit-user")
if (resetButton && formEditUser) {
    resetButton.addEventListener("click", () => {
        const ifConfirm = confirm("Bạn có chắc chắn muốn nhập lại không?")
        if (ifConfirm) {
            formEditUser.reset()
            imgPreview.src = "#"
            imgPreview.style.display = "none"
        }
    })
}
// End Reset Form

// Upload Image
const imgInput = document.querySelector("[upload-image-input]")
const imgPreview = document.querySelector("[upload-image-preview]")
if (imgInput && imgPreview) {
    imgInput.addEventListener("change", () => {
        const [file] = imgInput.files // e.target.files[0]
        if (file) {
            imgPreview.src = URL.createObjectURL(file)
        }
    })
}
// End Upload Image

// Event detect close tab
window.addEventListener("beforeunload",  () => {
    socket.emit("CLIENT_CLOSE_WEB", "test")
})
// End Event detect close tab