const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const ProductModal = module.exports = mongoose.model("Product", ProductSchema);
module.exports = ProductModal;