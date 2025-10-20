module.exports = (objectPagi, query, count) => {
    if(query.page){
        objectPagi.currentPage = parseInt(query.page)
    }

    if(query.limit){
        objectPagi.limitItems = parseInt(query.limit)
    }

    objectPagi.skip = (objectPagi.currentPage - 1) * objectPagi.limitItems

    objectPagi.totalPage = Math.ceil(count/objectPagi.limitItems)

    return objectPagi
}