const AuthModal = require("../modal/AuthModal");
const UserModal = require("../modal/UserModal");
const bcrypt = require("bcrypt");


const addUser = async (req, res) => {
    try {
        const { roleName, name, email, password, status, permissions } = req.body;

        const existingUser = await UserModal.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hexPassword = await bcrypt.hash(password, 10);
        const user = await new UserModal({ roleName, name, email, password: hexPassword, status, permissions });
        await user.save();

        res.status(200).send('User Register Successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await UserModal.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            message: "User fetched successfully",
            status: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await UserModal.deleteOne({ _id: id });
        res.status(200).send('Delete Successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { roleName, name, email, status, permissions } = req.body;
        const user = await UserModal.findByIdAndUpdate({ _id: id }, { roleName, name, email, status, permissions }, { new: true });
        if (!user) {
            return res.status(400).send('User not found');
        }
        res.status(200).send("User updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
module.exports = { addUser, getUser, deleteUser, editUser }