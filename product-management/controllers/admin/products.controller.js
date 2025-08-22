const Product = require("../../models/product.model")
const filterButtonHelper = require("../../helpers/filterButton")
const filterKeywordHelper = require("../../helpers/filterKeyword")

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

    const products = await Product.find(find)
    res.render("admin/pages/products/index", {
        pageTitle: "Products",
        products: products,
        filterButton: filterButton,
        keyword: keyword
    })
}