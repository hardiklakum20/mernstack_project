const express = require("express");
const { VarientMiddleware } = require("../middleware/VarientMiddleware");
const upload = require("../middleware/Multure");
const { addVariant, getVariant, deleteVariant, editVariant } = require("../controller/Varientcontroller");


const router = express.Router();

router.post('/add-variant', upload.any(), addVariant);
router.get('/get-variant/:id', getVariant);
router.delete('/delete-variant/:id', deleteVariant);
router.put('/edit-variant/:id',upload.any(), editVariant);

module.exports = router