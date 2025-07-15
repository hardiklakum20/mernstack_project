const mongoose = require("mongoose");


const ColorSchema = mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const ColorModal = module.exports = mongoose.model("Color", ColorSchema);
module.exports = ColorModal;