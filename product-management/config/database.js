const mongoose = require('mongoose')

module.exports.connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Database connect success!")
    } catch (error) {
        console.log("Database connect error!")
    }
}

