const systemConfig = require("../../config/system")
const dashboardRouter = require("./dashboard.route")
const productsRouter = require("./products.route")
const productsCategoryRouter = require("./products-category.route")
const rolesRouter = require("./roles.route")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + '/dashboard', dashboardRouter)
    app.use(PATH_ADMIN + '/products', productsRouter)
    app.use(PATH_ADMIN + '/products-category', productsCategoryRouter)
    app.use(PATH_ADMIN + '/roles', rolesRouter)
}