
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


// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.getElementById("form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let newStatus = currentStatus == "active" ? "inactive" : "active";

            const action = path + `/${newStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// End Change Status


// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
    const checkboxAll = checkboxMulti.querySelector("input[name='checkAll']")
    const checkboxItems = checkboxMulti.querySelectorAll("input[name='checkItem']")

    checkboxAll.addEventListener("click", () => {
        if (checkboxAll.checked) {
            checkboxItems.forEach(item => item.checked = true)
        } else {
            checkboxItems.forEach(item => item.checked = false)
        }
    })

    checkboxItems.forEach(item => {
        item.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='checkItem']:checked").length
            if (countChecked === checkboxItems.length) {
                checkboxAll.checked = true
            } else {
                checkboxAll.checked = false
            }
        })
    })
}
// End Checkbox Multi


// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()

        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const checkboxChecked = checkboxMulti.querySelectorAll("input[name='checkItem']:checked")

        const typeAction = e.target.elements.type.value
        if (typeAction === "") {
            alert("Vui lòng chọn hành động.")
            return
        } else if (typeAction === "delete-all") {
            const ifConfirm = confirm("Bạn có chắc chắn muốn xóa các mục đã chọn không?")
            if (!ifConfirm) return
        }

        if (checkboxChecked.length > 0) {
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            checkboxChecked.forEach(item => {
                const id = item.value

                if(typeAction === "change-position") {
                    const position = item.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}:${position}`)
                } else {
                    ids.push(id)
                }
            })

            inputIds.value = ids.join(",")

            formChangeMulti.submit()
        } else {
            alert("Vui lòng chọn ít nhất một mục.")
        }
    })
}
// End Form Change Multi


// Delete Button
const buttonsDelete = document.querySelectorAll("[button-delete]")
if (buttonsDelete.length > 0) {
    const formDeleteRecord = document.getElementById("form-delete-record")
    const path = formDeleteRecord.getAttribute("data-path")
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const ifConfirm = confirm("Bạn có chắc chắn muốn xóa mục này không?")
            if (ifConfirm) {
                const id = button.getAttribute("data-id")
                const action = path + `/${id}?_method=DELETE`
                formDeleteRecord.action = action
                formDeleteRecord.submit()
            }
        })
    })
}
// End Delete Button


// Reset Form
const resetButton = document.querySelector("[reset-button]")
const formCreate = document.querySelector("#form-create-record")
if (resetButton && formCreate) {
    resetButton.addEventListener("click", () => {
        const ifConfirm = confirm("Bạn có chắc chắn muốn nhập lại không?")
        if (ifConfirm) {
            formCreate.reset()
            imgPreview.src = "#"
            imgPreview.style.display = "none"
        }
    })
}
// End Reset Form


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