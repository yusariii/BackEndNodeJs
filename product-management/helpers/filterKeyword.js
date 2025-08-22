module.exports = (query) => {
    const regex = { $regex: query.keyword, $options: 'i' }
    return regex
}