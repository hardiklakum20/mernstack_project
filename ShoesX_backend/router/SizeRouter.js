const express = require("express");
const sizeMiddleware = require("../middleware/SizeMiddleware");
const { addSize, getSize, deleteSize, editSize } = require("../controller/SizeController");

const router = express.Router();

router.post('/add-size', sizeMiddleware, addSize);
router.get('/get-size', getSize);
router.delete('/delete-size/:id', deleteSize);
router.put('/edit-size/:id', sizeMiddleware, editSize);

module.exports = router