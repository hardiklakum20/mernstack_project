const express = require("express");
const { addUser, getUser, deleteUser, editUser } = require("../controller/UserController");

const router = express.Router();

router.post('/add-user', addUser);
router.get('/get-user', getUser);
router.delete('/delete-user/:id', deleteUser);
router.put('/edit-user/:id', editUser);

module.exports = router