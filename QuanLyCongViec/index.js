const express = require("express")
require("dotenv").config()
const database = require("./config/database")

database.connect()

const app = express()
const port = process.env.PORT

const route = require("./api/v1/routes/index.route")

route(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})