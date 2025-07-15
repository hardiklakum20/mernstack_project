const express = require('express');
const colorMiddleware = require('../middleware/ColorMiddleware');
const { addColor, getColor, deleteColor, editColor } = require('../controller/ColorController');

const router = express.Router();

router.post('/add-color', colorMiddleware, addColor);
router.get('/get-color', getColor);
router.delete('/delete-color/:id', deleteColor);
router.put('/edit-color/:id', editColor);


module.exports = router