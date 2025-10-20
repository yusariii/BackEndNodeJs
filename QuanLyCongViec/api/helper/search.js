module.exports = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    }

    if (query.keyword) {
        objectSearch.keyword = query.keyword
        const regex = { $regex: objectSearch.keyword, $options: 'i' }
        objectSearch.regex = regex
    }

    return objectSearch
}