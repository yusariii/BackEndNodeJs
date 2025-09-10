const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
const paginationHelper = require("../../helpers/pagination")


// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    // Pagination
    const objectPagination = paginationHelper(req.query)
    const countRecords = await Account.countDocuments(find)
    objectPagination.totalPages = Math.ceil(countRecords / objectPagination.limitItems)
    // End pagination

    const records = await Account.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render("admin/pages/accounts/index", {
        pageTitle: "accounts",
        records: records,
        pagination: objectPagination
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted: false})
    res.render("admin/pages/accounts/create", {
        pageTitle: "Create account",
        roles: roles
    })
}

// [POST] /admin/accounts/create
module.exports.createAccount = async (req, res) => {
    const account = new Account(req.body)
    await account.save()
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const find = {
            _id: id,
            deleted: false
        }
        const [account, roles] = await Promise.all([
            await Account.findOne(find),
            await Role.find({deleted: false})
        ])
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Edit account",
            record: account,
            roles: roles
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editAccount = async (req, res) => {
    try {
        const id = req.params.id
        await Account.updateOne({ _id: id }, req.body)
        req.flash('success', 'Cập nhật nhóm quyền thành công!')
        const backURL = req.get('Referer')
        res.redirect(backURL)
    } catch (error) {
        req.flash('error', 'Cập nhật nhóm quyền thất bại! Vui lòng thử lại sau.')
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [DELETE] /admin/accounts/delete/:id
module.exports.deleteAccount = async (req, res) => {
    const id = req.params.id
    console.log(id)
    await Account.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    // await Product.deleteOne({ _id: id})
    req.flash('success', 'Xóa tài khoản thành công!')

    const backURL = req.get('Referer')
    res.redirect(backURL)
}


// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id
        const account = await Account.findOne({ _id: id, deleted: false })
        const role = await Role.findOne({_id: account.role_id, deleted: false})
        res.render("admin/pages/accounts/detail", {
            pageTitle: account.title,
            record: account,
            role: role
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}


