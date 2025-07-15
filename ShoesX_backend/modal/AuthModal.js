const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
}, { timestamps: true });

const AuthModal = module.exports = mongoose.model("Auth", AuthSchema);
module.exports = AuthModal;