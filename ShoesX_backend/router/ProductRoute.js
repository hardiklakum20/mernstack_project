const express = require("express");
const ProductMiddleware = require("../middleware/ProductMiddleware");
const { addProduct, getProduct, deleteProduct, editProduct } = require("../controller/ProductController");

const router = express.Router();

router.post('/add-product', ProductMiddleware, addProduct);
router.get('/get-product', getProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/edit-product/:id', ProductMiddleware, editProduct);

module.exports = router