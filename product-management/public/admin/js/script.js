
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
if (imgInput && imgPreview) {
    imgInput.addEventListener("change", () => {
        const [file] = imgInput.files // e.target.files[0]
        if (file) {
            imgPreview.src = URL.createObjectURL(file)
        }
    })
}
// End Upload Image



// Sort
const sortDiv = document.querySelector("[sort]")
if (sortDiv) {
    const sortSelect = sortDiv.querySelector("[sort-select]")
    let url = new URL(window.location.href)
    if (sortSelect) {
        sortSelect.value = url.searchParams.get("sort") || ""
        sortSelect.addEventListener("change", (e) => {
            const sort = e.target.value
            const [sortBy, sortType] = sort.split("-")
            if (sortBy && sortType) {
                url.searchParams.set("sortBy", sortBy)
                url.searchParams.set("sortType", sortType)
            }
            else {
                url.searchParams.delete("sortBy")
                url.searchParams.delete("sortType")
            }
            window.location.href = url.href
        })

    }

    const sortClear = sortDiv.querySelector("[sort-clear]")
    if (sortClear) {
        sortClear.addEventListener("click", () => {
            url.searchParams.delete("sortBy")
            url.searchParams.delete("sortType")
            window.location.href = url.href
        })
    }

    const sortBy = url.searchParams.get("sortBy")
    const sortType = url.searchParams.get("sortType")
    if (sortBy && sortType){
        const stringSort = `${sortBy}-${sortType}`
        const optionSelect = sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelect.selected = true
    }
}
// End Sort 