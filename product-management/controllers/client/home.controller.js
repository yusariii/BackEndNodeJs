const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

// [GET] /
module.exports.index = async (req, res) => {
    // Featured Products
    const featuredProducts = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6)
    const newFeaturedProducts = productsHelper.calculatePriceNew(featuredProducts)
    // End Featured Products

    // Newest Products
    const newestProducts = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6)
    const newNewestProducts = productsHelper.calculatePriceNew(newestProducts)
    // End Newest Products
    res.render("client/pages/home/index", {
        pageTitle: "Home",
        featuredProducts: newFeaturedProducts,
        newestProducts: newNewestProducts
    })
}