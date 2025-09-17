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