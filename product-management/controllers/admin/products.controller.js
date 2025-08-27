const Product = require("../../models/product.model")
const filterButtonHelper = require("../../helpers/filterButton")
const filterKeywordHelper = require("../../helpers/filterKeyword")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // console.log(req.query.status)
    let keyword = ""
    const filterButton = filterButtonHelper(req.query)

    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    if (req.query.keyword) {
        find.title = filterKeywordHelper(req.query)
        keyword = req.query.keyword
    }

    const objectPagination = paginationHelper(req.query)

    const countProducts = await Product.countDocuments(find)
    objectPagination.totalPages = Math.ceil(countProducts / objectPagination.limitItems)

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.render("admin/pages/products/index", {
        pageTitle: "Products",
        products: products,
        filterButton: filterButton,
        keyword: keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    const backURL = req.get('Referer')
    res.redirect(backURL)
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(",")

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            break;
        default:
            break;
    }

    const backURL = req.get('Referer')
    res.redirect(backURL)
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id

    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    // await Product.deleteOne({ _id: id})

    const backURL = req.get('Referer')
    res.redirect(backURL)
}