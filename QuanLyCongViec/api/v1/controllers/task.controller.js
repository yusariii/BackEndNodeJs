const Task = require("../models/task.model")
const pagiHelper = require("../../helper/pagination")
const searchHelper = require("../../helper/search")

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }


    // Search Keyword
    let objectSearch = searchHelper(req.query)

    if (req.query.keyword) {
        find.title = objectSearch.regex
    }
    // End SearchKeyword

    // Pagi
    const initPagi = {
        currentPage: 1,
        limitItems: 2
    }
    const countTask = await Task.countDocuments(find)
    const objectPagi = pagiHelper(
        initPagi,
        req.query,
        countTask
    )
    // End Pagi

    // Sort
    const sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    // End Sort
    const tasks = await Task.find(find).sort(sort).limit(objectPagi.limitItems).skip(objectPagi.skip)
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

module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.status
        await Task.updateOne({
            _id: id
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: "Cap nhat thanh cong"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}

module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhật nhiều công việc thành công"
                })
                break;
            case "deleted":
                await Task.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    deleted: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhật nhiều công việc thành công"
                })
                break;
            default:
                res.json({
                    code: 400,
                    message: "Cập nhật nhiều công việc thất bại"
                })
                break;
        }

    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật nhiều công việc thất bại"
        })
    }
}


module.exports.create = async (req, res) => {
    try {
        const task = new Task(
            req.body
        )
        await task.save()
        res.json({
            code: 200,
            message: "Tạo công việc thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo công việc thất bại"
        })
    }
}