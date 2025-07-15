const express = require("express");
const { brandMiddleware } = require("../middleware/BrandMiddleware");
const { addBrand, getBrand, deleteBrand, editBrand } = require("../controller/Brandcontroller");
const upload = require("../middleware/Multure");

const router = express.Router();

router.post('/add-brand', brandMiddleware, upload.single('image'), addBrand);
router.get('/get-brand', getBrand);
router.delete('/delete-brand/:id', deleteBrand);
router.put('/edit-brand/:id', brandMiddleware, upload.single('image'), editBrand);

module.exports = router