const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    position: Number,
    title: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema, "products")
// Product -> Ten Model
// productSchema -> Schema
// products -> Bang products trong Database

module.exports = Product