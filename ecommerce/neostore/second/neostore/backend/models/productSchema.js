const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true
    },
    product_subimages: {
        type: Array
    },
    product_cost: {
        type: Number,
        required: true
    },
    product_rating: {
        type: Number
    },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "colors"
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("productSchema", productSchema)