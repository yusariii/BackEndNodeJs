
// Button Active
const buttonsActive = document.querySelectorAll("[btn-active]")
if (buttonsActive.length > 0) {
    let url = new URL(window.location.href)

    buttonsActive.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("btn-active")

            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }

            url.searchParams.delete("page")

            window.location.href = url.href
        })
    })
}
// End Button Active

// Form Search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        // console.log(e.target.elements.keyword.value)
        const keyword = e.target.elements.keyword.value

        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }

        url.searchParams.delete("page")

        window.location.href = url.href
    })
}
// End Form Search

// Pagination
const buttonsPage = document.querySelectorAll("[pages]")
if (buttonsPage.length > 0) {
    let url = new URL(window.location.href)

    buttonsPage.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("pages")

            if (page) {
                url.searchParams.set("page", page)
            } else {
                url.searchParams.delete("page")
            }

            window.location.href = url.href
        })
    })
}
// End Pagination

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

// Upload Image
const imgInput = document.querySelector("[upload-image-input]")
const imgPreview = document.querySelector("[upload-image-preview]")
imgInput.addEventListener("change", (e) => {
    const [file] = imgInput.files
    if (file) {
        imgPreview.src = URL.createObjectURL(file)
        imgPreview.style.display = "block"
    }
})
// End Upload Image

// Reset Form
const resetButton = document.querySelector("[reset-button]")
const formCreate = document.querySelector("#form-create-product")
resetButton.addEventListener("click", () => {
    const ifConfirm = confirm("Bạn có chắc chắn muốn nhập lại không?")
    if (ifConfirm) {
        formCreate.reset()
        imgPreview.src = "#"
        imgPreview.style.display = "none"
    }
})
// End Reset Form