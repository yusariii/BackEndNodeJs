const Cart = require("../../models/cart.model")

// [GET] /cart
module.exports.index = async (req, res) => {

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",

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