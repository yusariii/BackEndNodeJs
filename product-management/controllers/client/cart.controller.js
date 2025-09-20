const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [GET] /cart
module.exports.index = async (req, res) => {

    const cartId = req.cookies.cartId

    const cart = await Cart.findOne({
        _id: cartId
    })

    let cartTotal = 0

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id
            const product = await Product.findOne({
                _id: productId,
                deleted: false,
                status: "active"
            }).select("title thumbnail slug price discountPercentage")
            productsHelper.calculatePriceNewProduct(product)
            item.productInfo = product
            item.total = item.quantity * product.priceNew
            cartTotal += item.total
        }
    }

    cart.cartTotal = cartTotal

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

// [PATCH] /cart/delete/:id
module.exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId

    const product = await Product.findOne({
        _id: productId,
        deleted: false,
        status: "active"
    })

    const cartId = req.cookies.cartId

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {
            products: {
                product_id: productId
            }
        }
    })

    req.flash("success", `Đã xóa sản phẩm ${product.title} khỏi giỏ hàng!`)
    const backURL = req.get('Referer')
    res.redirect(backURL)
}