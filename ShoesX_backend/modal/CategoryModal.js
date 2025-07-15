const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const CategoryModal = module.exports = mongoose.model("Category", CategorySchema);
module.exports = CategoryModal;