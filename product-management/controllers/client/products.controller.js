const Product = require("../../models/product.model")
const ProductCategory = require("../../models/products-category.model")
const productsHelper = require("../../helpers/products")
const productsCategoryHelper = require("../../helpers/products-category")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })

    const newProducts = productsHelper.calculatePriceNewProducts(products)

    res.render("client/pages/products/index", {
        pageTitle: "Products",
        products: newProducts
    })
}

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        const product = await Product.findOne(find)

        productsHelper.calculatePriceNewProduct(product)

        if (product.category_id){
            const category = await ProductCategory.findOne({
                _id: product.category_id,
                deleted: false,
                status: "active"
            })

            product.category = category
        }

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        return res.redirect("/products")
    }

}


// [GET] /products/category/:slugCategory
module.exports.category = async (req, res) => {
    try {
        const category = await ProductCategory.findOne({
            slug: req.params.slugCategory,
            status: "active",
            deleted: false
        })

        const listSubCategory = await productsCategoryHelper.getSubCategory(category.id)

        const listSubCategoryId = listSubCategory.map(item => item.id)

        const products = await Product.find({
            deleted: false,
            status: "active",
            category_id: { $in: [category.id, ...listSubCategoryId] }
        })

        const newProducts = productsHelper.calculatePriceNewProducts(products)
        res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: newProducts
        })
    } catch (error) {
        console.log(error)
        res.redirect("/products")

    }
}
