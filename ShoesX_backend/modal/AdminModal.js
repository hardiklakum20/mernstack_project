const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    }
}, { timestamps: true });

const AdminModal = module.exports = mongoose.model("Admin", adminSchema);
module.exports = AdminModal;