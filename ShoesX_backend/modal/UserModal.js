const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    view: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
}, { _id: false });

const UserSchema = mongoose.Schema({
    roleName: {
        type: String,
        required: true
    },
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
    status: {
        type: Number,
        required: true
    },
    permissions: {
        dashboard: { type: permissionSchema, default: () => ({}) },
        users: { type: permissionSchema, default: () => ({}) },
        products: { type: permissionSchema, default: () => ({}) },
        category: { type: permissionSchema, default: () => ({}) },
        brand: { type: permissionSchema, default: () => ({}) },
        color: { type: permissionSchema, default: () => ({}) },
        size: { type: permissionSchema, default: () => ({}) },
        payment: { type: permissionSchema, default: () => ({}) },
        orders: { type: permissionSchema, default: () => ({}) },
        role: { type: permissionSchema, default: () => ({}) },
        bids: { type: permissionSchema, default: () => ({}) }
    }
}, { timestamps: true });

const UserModal = mongoose.model("User", UserSchema);
module.exports = UserModal;