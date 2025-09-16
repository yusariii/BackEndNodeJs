const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    position: Number,
    title: String,
    category_id: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured: String,
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ],
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
})

const Product = mongoose.model("Product", productSchema, "products")
// Product -> Ten Model
// productSchema -> Schema
// products -> Bang products trong Database

module.exports = Product