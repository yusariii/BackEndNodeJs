const ProductsCategory = require("../../models/products-category.model")
const systemConfig = require("../../config/system")
const filterButtonHelper = require("../../helpers/filterButton")
const filterKeywordHelper = require("../../helpers/filterKeyword")
const paginationHelper = require("../../helpers/pagination")
const createTreeHelper = require("../../helpers/createTree")

// [GET] /admin/products-category
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    //Search
    let keyword = ""
    const filterButton = filterButtonHelper(req.query)
    if (req.query.status) {
        find.status = req.query.status
    }

    if (req.query.keyword) {
        find.title = filterKeywordHelper(req.query)
        keyword = req.query.keyword
    }
    // End Search

    // Pagination
    // const objectPagination = paginationHelper(req.query)
    // const countRecords = await ProductsCategory.countDocuments(find)
    // objectPagination.totalPages = Math.ceil(countRecords / objectPagination.limitItems)
    // End pagination

    // Sort
    // let sort = {}
    // if (req.query.sortBy && req.query.sortType) {
    //     sort[req.query.sortBy] = req.query.sortType
    // } else {
    //     sort.position = "desc"
    // }
    // End Sort

    const records = await ProductsCategory.find(find)  
        // .sort(sort) 
        // .limit(objectPagination.limitItems)
        // .skip(objectPagination.skip)

    const newRecords = createTreeHelper.createTree(records)

    res.render("admin/pages/products-category/index", {
        pageTitle: "Category",
        records: newRecords,
        // pagination: objectPagination,
        filterButton: filterButton,
        keyword: keyword
    })
}


// [PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await ProductsCategory.updateOne({ _id: id }, { status: status })

    req.flash('success', 'Cập nhật trạng thái thành công!')

    const backURL = req.get('Referer')
    res.redirect(backURL)
}


// [PATCH] /admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(",")

    switch (type) {
        case "active":
            await ProductsCategory.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Cập nhật trạng thái ${ids.length} danh mục thành công!`)
            break;
        case "inactive":
            await ProductsCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', `Cập nhật trạng thái ${ids.length} danh mục thành công!`)
            break;
        case "delete-all":
            await ProductsCategory.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            req.flash('success', `Xóa ${ids.length} danh mục thành công!`)
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split(":")
                await ProductsCategory.updateOne({ _id: id }, { position: parseInt(position), updateAt: new Date() })
                req.flash('success', `Cập nhật vị trí ${ids.length} danh mục thành công!`)
            }
            break;
        default:
            break;
    }

    const backURL = req.get('Referer')
    res.redirect(backURL)
}


// [DELETE] /admin/products-category/delete/:id
module.exports.deleteProductsCategory = async (req, res) => {
    const id = req.params.id

    await ProductsCategory.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    // await ProductsCategory.deleteOne({ _id: id})
    req.flash('success', 'Xóa danh mục thành công!')

    const backURL = req.get('Referer')
    res.redirect(backURL)
}


// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await ProductsCategory.find(find)

    const newRecords = createTreeHelper.createTree(records)

    console.log(newRecords)

    res.render("admin/pages/products-category/create", {
        pageTitle: "Category create",
        records: newRecords
    })
}


// [POST] /admin/products-category/create
module.exports.createProductsCategory = async (req, res) => {
    if (!req.body.position) {
        const count = await ProductsCategory.countDocuments()
        req.body.position = count + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    const productsCategory = new ProductsCategory(req.body)
    await productsCategory.save()

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}


// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const findOne = {
            _id: id,
            deleted: false
        }
        const find = {
            _id: { $ne: id },
            deleted: false
        }
        const [record, records] = await Promise.all([
            ProductsCategory.findOne(findOne),
            ProductsCategory.find(find)
        ])
        const newRecords = createTreeHelper.createTree(records)
        res.render("admin/pages/products-category/edit", {
            pageTitle: "Edit Product's Category",
            record: record,
            records: newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}


// [PATCH] /admin/products-category/edit/:id
module.exports.editProductsCategory = async (req, res) => {
    req.body.position = parseInt(req.body.position)

    const id = req.params.id
    try {
        await ProductsCategory.updateOne({ _id: id }, req.body)
        req.flash('success', 'Cập nhật danh mục thành công!')
        const backURL = req.get('Referer')
        res.redirect(backURL)
    } catch (error) {
        req.flash('error', 'Cập nhật danh mục thất bại! Vui lòng thử lại sau.')
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}


// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id
    try {
        const productsCategory = await ProductsCategory.findOne({ _id: id, deleted: false })
        res.render("admin/pages/products-category/detail", {
            pageTitle: productsCategory.title,
            record: productsCategory
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}