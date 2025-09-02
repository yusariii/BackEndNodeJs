//Import express and dotenv
const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require("dotenv").config()

//Import and connect database
const database = require("./config/database")
database.connect()

//Import router
const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")

//app and port
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser("asdaksdasdaa"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
const port = process.env.PORT

//App locals variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Set views and view engine
app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")




//Static folder
app.use(express.static(`${__dirname}/public`))

//Run router
route(app)
routeAdmin(app)

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app