const Product = require("../../models/product.model")


// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })

    const newProducts = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
        return item
    })

    res.render("client/pages/products/index", {
        pageTitle: "Products",
        products: newProducts
    })
}

// [GET] /products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find)

        product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0)

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product
        })
    } catch (error) {
        return res.redirect("/products")
    }

}
