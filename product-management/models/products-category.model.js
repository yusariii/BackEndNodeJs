const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productsCategorySchema = new mongoose.Schema({
    position: Number,
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    category: String,
    thumbnail: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const ProductsCategory = mongoose.model("ProductsCategory", productsCategorySchema, "products-category")

module.exports = ProductsCategory