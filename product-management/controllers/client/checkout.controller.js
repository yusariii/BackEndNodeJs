const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Order = require("../../models/order.model")

const productsHelper = require("../../helpers/products")

// [GET] /checkout
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
            }).select("title thumbnail slug price discountPercentage stock")
            productsHelper.calculatePriceNewProduct(product)
            item.productInfo = product
            item.total = item.quantity * product.priceNew
            cartTotal += item.total
        }
    }

    cart.cartTotal = cartTotal
    res.render("client/pages/checkout/index", {
        pageTitle: "Thanh toán",
        cart: cart
    })

}


// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId
    const userInfo = req.body

    const cart = await Cart.findOne({
        _id: cartId
    })

    let products = []

    for (const product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity
        }

        const productInfo = await Product.findOne({
            _id: product.product_id
        })

        objectProduct.price = productInfo.price
        objectProduct.discountPercentage = productInfo.discountPercentage

        products.push(objectProduct)
    }


    const orderInfo = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }

    const order = new Order(orderInfo)
    order.save()

    await Cart.updateOne({
        _id: cartId
    }, {
        products: []
    })

    res.redirect(`/checkout/success/${order.id}`)

}

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {

    const order = await Order.findOne({
        _id: req.params.orderId
    })

    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail")

        productsHelper.calculatePriceNewProduct(product)
        product.productInfo = productInfo
        product.totalPrice = product.priceNew * product.quantity
    }

    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0)


    res.render("client/pages/checkout/success", {
        pageTitle: "Thanh toán thành công",
        order: order
    })
}