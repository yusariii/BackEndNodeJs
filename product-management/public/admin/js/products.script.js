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
    const formDeleteProduct = document.getElementById("form-delete-product")
    const path = formDeleteProduct.getAttribute("data-path")
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const ifConfirm = confirm("Bạn có chắc chắn muốn xóa mục này không?")
            if (ifConfirm) {
                const id = button.getAttribute("data-id")
                const action = path + `/${id}?_method=DELETE`
                formDeleteProduct.action = action
                formDeleteProduct.submit()
            }
        })
    })
}
// End Delete Button