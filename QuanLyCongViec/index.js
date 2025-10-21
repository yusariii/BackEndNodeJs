const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const database = require("./config/database")

database.connect()

const app = express()
const port = process.env.PORT

const route = require("./api/v1/routes/index.route")

app.use(bodyParser.json())

route(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})