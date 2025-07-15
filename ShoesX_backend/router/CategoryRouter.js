const express = require("express");
const categoryMiddleware = require("../middleware/CategoryMiddleware");
const { addCategory, getCategories, deleteCategories, editCategory } = require("../controller/CategoryController");

const router = express.Router();

router.post('/add-category', categoryMiddleware, addCategory);
router.get('/category', getCategories);
router.delete('/delete-category/:id', deleteCategories);
router.put('/update-category/:id', categoryMiddleware, editCategory);

module.exports = router