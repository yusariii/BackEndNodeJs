const ProductCategory = require("../../models/products-category.model")
const Product = require("../../models/product.model")
const Account = require("../../models/account.model")
const User = require("../../models/user.model")
// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistics = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },
        order: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }
    statistics.categoryProduct.total = await ProductCategory.countDocuments({
        deleted: false
    })
    statistics.categoryProduct.active = await ProductCategory.countDocuments({ status: "active", deleted: false })
    statistics.categoryProduct.inactive = await ProductCategory.countDocuments({ status: "inactive", deleted: false })

    statistics.product.total = await Product.countDocuments({ deleted: false })
    statistics.product.active = await Product.countDocuments({ status: "active", deleted: false })
    statistics.product.inactive = await Product.countDocuments({ status: "inactive", deleted: false })

    statistics.account.total = await Account.countDocuments({ deleted: false })
    statistics.account.active = await Account.countDocuments({ status: "active", deleted: false })
    statistics.account.inactive = await Account.countDocuments({ status: "inactive", deleted: false })

    statistics.user.total = await User.countDocuments({ deleted: false })
    statistics.user.active = await User.countDocuments({ status: "active", deleted: false })
    statistics.user.inactive = await User.countDocuments({ status: "inactive", deleted: false })
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang chủ",
        statistics: statistics
    })
}