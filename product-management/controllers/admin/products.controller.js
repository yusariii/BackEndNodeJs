const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")
const filterButtonHelper = require("../../helpers/filterButton")
const filterKeywordHelper = require("../../helpers/filterKeyword")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // console.log(req.query.status)
    let keyword = ""
    const filterButton = filterButtonHelper(req.query)

    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    if (req.query.keyword) {
        find.title = filterKeywordHelper(req.query)
        keyword = req.query.keyword
    }

    const objectPagination = paginationHelper(req.query)

    const countProducts = await Product.countDocuments(find)
    objectPagination.totalPages = Math.ceil(countProducts / objectPagination.limitItems)

    const products = await Product.find(find)
        .sort({ position: "asc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
    res.render("admin/pages/products/index", {
        pageTitle: "Products",
        products: products,
        filterButton: filterButton,
        keyword: keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    req.flash('success', 'Cập nhật trạng thái thành công!')

    const backURL = req.get('Referer')
    res.redirect(backURL)
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(",")

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`)
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`)
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            req.flash('success', `Xóa ${ids.length} sản phẩm thành công!`)
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split(":")
                await Product.updateOne({ _id: id }, { position: parseInt(position), updateAt: new Date() })
                req.flash('success', `Cập nhật vị trí ${ids.length} sản phẩm thành công!`)
            }
            break;
        default:
            break;
    }

    const backURL = req.get('Referer')
    res.redirect(backURL)
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id

    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    // await Product.deleteOne({ _id: id})
    req.flash('success', 'Xóa sản phẩm thành công!')

    const backURL = req.get('Referer')
    res.redirect(backURL)
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Create Product"
    })
}

// [POST] /admin/products/create
module.exports.createProduct = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (!req.body.position) {
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }


    const product = new Product(req.body)
    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const find = {
            _id: id,
            deleted: false
        }
        const product = await Product.findOne(find)
        res.render("admin/pages/products/edit", {
            pageTitle: "Edit Product",
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.editProduct = async (req, res) => {
    req.body.price = parseFloat(req.body.price)
    req.body.discountPercent = parseFloat(req.body.discountPercent)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    const id = req.params.id
    try {
        await Product.updateOne({ _id: id }, req.body)
        req.flash('success', 'Cập nhật sản phẩm thành công!')
        const backURL = req.get('Referer')
        res.redirect(backURL)
    } catch (error) {

    }
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ _id: id, deleted: false })
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}