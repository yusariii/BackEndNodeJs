const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
const paginationHelper = require("../../helpers/pagination")


// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    // Pagination
    const objectPagination = paginationHelper(req.query)
    const countRecords = await Role.countDocuments(find)
    objectPagination.totalPages = Math.ceil(countRecords / objectPagination.limitItems)
    // End pagination

    const records = await Role.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render("admin/pages/roles/index", {
        pageTitle: "Roles",
        records: records,
        pagination: objectPagination
    })
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Create Role",
    })
}

// [POST] /admin/roles/create
module.exports.createRole = async (req, res) => {
    const role = new Role(req.body)
    await role.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const find = {
            _id: id,
            deleted: false
        }
        const role = await Role.findOne(find)
        res.render("admin/pages/roles/edit", {
            pageTitle: "Edit Role",
            record: role,
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editRole = async (req, res) => {
    try {
        const id = req.params.id
        await Role.updateOne({ _id: id }, req.body)
        req.flash('success', 'Cập nhật nhóm quyền thành công!')
        const backURL = req.get('Referer')
        res.redirect(backURL)
    } catch (error) {
        req.flash('error', 'Cập nhật nhóm quyền thất bại! Vui lòng thử lại sau.')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [DELETE] /admin/roles/delete/:id
module.exports.deleteRole = async (req, res) => {
    const id = req.params.id
    console.log(id)
    await Role.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    // await Product.deleteOne({ _id: id})
    req.flash('success', 'Xóa nhóm quyền thành công!')

    const backURL = req.get('Referer')
    res.redirect(backURL)
}


// [GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id
        const role = await Role.findOne({ _id: id, deleted: false })
        res.render("admin/pages/roles/detail", {
            pageTitle: role.title,
            record: role,
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}


// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find)
    const count = records.length
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Permissions",
        records: records,
        count: count
    })
}


// [PATCH] /admin/roles/permissions
module.exports.editPermissions = async (req, res) => {
    // console.log(req.body)
    try {
        const permissions = JSON.parse(req.body.permissions)


        for (const item of permissions) {
            await Role.updateOne(
                { _id: item.id },
                { permissions: item.permissionsArr }
            )
        }

        req.flash('success', 'Cập nhật nhóm quyền thành công!')

        res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`)
    } catch (error) {
        
    }

}