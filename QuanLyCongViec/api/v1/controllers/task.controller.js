const Task = require("../models/task.model")


module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    const sort = {}

    if (req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }


    const tasks = await Task.find(find).sort(sort)
    res.json(tasks)
}

module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id
    const task = await Task.findOne({
        deleted: false,
        _id: id
    })
    res.json(task)
    } catch {
        res.json("Not found!")
    }
}