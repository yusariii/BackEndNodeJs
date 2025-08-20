const Product = require("../../models/product.model")


// [GET] /admin/products
module.exports.index = async (req, res) => {
    // console.log(req.query.status)

    const filterButton = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        },
    ]

    if (req.query.status) {
        const index = filterButton.findIndex(item => item.status == req.query.status)
        filterButton[index].class = "active"
    } else {
        const index = filterButton.findIndex(item => item.status == "")
        filterButton[index].class = "active"
    }

    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    if (req.query.keyword) {
        find.title = { $regex: req.query.keyword, $options: 'i' }
    }

    const products = await Product.find(find)
    res.render("admin/pages/products/index", {
        pageTitle: "Products",
        products: products,
        filterButton: filterButton
    })
}