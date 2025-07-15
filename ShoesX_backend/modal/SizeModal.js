const mongoose = require("mongoose");

const SizeSchema = mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const SizeModal = module.exports = mongoose.model("Size", SizeSchema);
module.exports = SizeModal;