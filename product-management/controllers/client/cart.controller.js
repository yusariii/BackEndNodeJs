const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [GET] /cart
module.exports.index = async (req, res) => {

    const cartId = req.cookies.cartId

    const cart = await Cart.findOne({
        _id: cartId
    })

    if (cart.products.length > 0){
        for(const item of cart.products){
            const productId = item.product_id
            const product = await Product.findOne({
                _id: productId,
                deleted: false,
                status: "active"
            }).select("title thumbnail slug price discountPercentage")
            productsHelper.calculatePriceNewProduct(product)
            item.productInfo = product
        }
    }

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cart: cart
    })

}


// [PATCH] /cart/add/:id
module.exports.addProduct = async (req, res) => {

    const productId = req.params.productId
    const quantity = parseInt(req.body.quantity)
    const cartId = req.cookies.cartId

    const cart = await Cart.findOne({
        _id: cartId
    })

    const existProductInCart = cart.products.find(item => item.product_id == productId)

    if (existProductInCart) {
        const quantityNew = quantity + existProductInCart.quantity
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": quantityNew
            }
        })
    } else {
        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {
                products: {
                    product_id: productId,
                    quantity: quantity
                }
            }
        })
    }


    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")
    const backURL = req.get('Referer')
    res.redirect(backURL)

}