const ProductsCategory = require("../../models/products-category.model")
const systemConfig = require("../../config/system")
const paginationHelper = require("../../helpers/pagination")
// [GET] /admin/products-category
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const objectPagination = paginationHelper(req.query)
    const countRecords = await ProductsCategory.countDocuments(find)
    objectPagination.totalPages = Math.ceil(countRecords / objectPagination.limitItems)

    const records = await ProductsCategory.find(find)   
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render("admin/pages/products-category/index", {
        pageTitle: "Category",
        records: records,
        pagination: objectPagination
    })
}

// [GET] /admin/products-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create", {
        pageTitle: "Category create"
    })
}

// [POST] /admin/products-category/create
module.exports.createProductsCategory = async (req, res) => {
    if (!req.body.position) {
        const count = await ProductsCategory.countDocuments()
        req.body.position = count + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    const productsCategory = new ProductsCategory(req.body)
    await productsCategory.save()

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}