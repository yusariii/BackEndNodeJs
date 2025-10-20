const taskRouter = require("../routes/task.route")
const systemConfig = require("../../../config/system")

module.exports = (app) => {
    const PATH_API_V1 = systemConfig.prefixAPIV1
    app.use(PATH_API_V1 + "/tasks", taskRouter)
}