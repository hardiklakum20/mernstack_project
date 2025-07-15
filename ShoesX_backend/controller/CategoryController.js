const CategoryModal = require("../modal/CategoryModal");


const addCategory = async (req, res) => {
    try {
        const { category, status } = req.body;

        const newCategory = new CategoryModal({ category, status });
        await newCategory.save();

        res.status(200).send('Category added successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModal.find().sort({ createdAt: -1 });
        res.status(200).json(
            {
                message: "Categories fetched successfully",
                status: true,
                categories
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteCategories = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryModal.deleteOne({ _id: id });
        res.status(200).send('Delete Successfully');
    } catch (error) {
        console.log(error);
    }
}

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, status } = req.body;

        const updateCategory = await CategoryModal.findByIdAndUpdate({ _id: id }, { category, status }, { new: true });

        if (!updateCategory) {
            return res.status(400).send('Category not found');
        }
        res.status(200).send("Category updated successfully");

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports = { addCategory, getCategories, deleteCategories, editCategory }