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
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const checkboxChecked = checkboxMulti.querySelectorAll("input[name='checkItem']:checked")

        if(checkboxChecked.length > 0) {
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            checkboxChecked.forEach(item => ids.push(item.value))

            inputIds.value = ids.join(",")

            formChangeMulti.submit()
        } else {
            alert("Vui lòng chọn ít nhất một mục.")
        }
    })
}