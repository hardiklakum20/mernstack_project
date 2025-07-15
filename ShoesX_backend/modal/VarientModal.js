const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    variants: [{
        index: {
            type: Number,
            default: 0
        },
        color: {
            type: mongoose.Types.ObjectId,
            ref: "Color",
            required: true
        },
        size: {
            type: mongoose.Types.ObjectId,
            ref: "Size",
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        images: {
            type: [String],
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Variant", VariantSchema);
