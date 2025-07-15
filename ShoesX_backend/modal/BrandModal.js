const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true
        }
    ]

}, { timestamps: true });

const BrandModal = module.exports = mongoose.model("Brand", BrandSchema);
module.exports = BrandModal;