const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

// [GET] /checkout
module.exports.index = async (req, res) => {
    
    res.render("client/pages/checkout/index", {
        pageTitle: "Thanh toán",
    })

}