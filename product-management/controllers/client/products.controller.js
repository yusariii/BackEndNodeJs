const Product = require("../../models/product.model")
const ProductCategory = require("../../models/products-category.model")
const productsHelper = require("../../helpers/products")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })

    const newProducts = productsHelper.calculatePriceNew(products)

    res.render("client/pages/products/index", {
        pageTitle: "Products",
        products: newProducts
    })
}

// [GET] /products/detail/:slug
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


// [GET] /products/:slug
module.exports.category = async (req, res) => {
    try {
        const category = await ProductCategory.findOne({
            slug: req.params.slug,
            status: "active",
            deleted: false
        })

        const getSubCategory = async (parentId) => {
            const subs = await ProductCategory.find({
                deleted: false,
                status: "active",
                parent_id: parentId
            })

            let allSub = [...subs]

            for (const sub of subs) {
                const child = await getSubCategory(sub.id)
                allSub = allSub.concat(child)
            }
            return allSub
        }

        const listSubCategory = await getSubCategory(category.id)

        const listSubCategoryId = listSubCategory.map(item => item.id)


        const products = await Product.find({
            deleted: false,
            status: "active",
            category_id: { $in: [category.id, ...listSubCategoryId] }
        })

        const newProducts = productsHelper.calculatePriceNew(products)
        res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: newProducts
        })
    } catch (error) {
        console.log(error)
        res.redirect("/products")

    }
}
