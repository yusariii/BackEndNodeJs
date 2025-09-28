//Import express and dotenv
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const moment = require('moment')
const http = require('http')
const { Server } = require("socket.io");
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

//SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//End SocketIO

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))

//App locals variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment

//Set views and view engine
app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")




//Static folder
app.use(express.static(`${__dirname}/public`))

//Run router
route(app)
routeAdmin(app)
app.get('/{*any}', (req, res) => {
    res.render("client/pages/errors/404", {
        pageTitle: "404 Not Found"
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

