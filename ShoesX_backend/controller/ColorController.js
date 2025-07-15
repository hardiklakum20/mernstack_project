const ColorModel = require('../modal/ColorModel');
const ColorModal = require('../modal/ColorModel');

const addColor = async (req, res) => {
    try {
        const { color, status } = req.body;

        const existingColor = await ColorModal.findOne({ color });
        if (existingColor) {
            return res.status(400).send('Color Already existed')
        }

        const newColor = new ColorModal({ color, status });
        await newColor.save();

        res.status(200).send('Color added successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getColor = async (req, res) => {
    try {
        const color = await ColorModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Color fetched successfully",
            status: true,
            color
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;
        await ColorModal.deleteOne({ _id: id });
        res.status(200).send('Delete Successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const editColor = async (req, res) => {
    try {
        const { id } = req.params;
        const { color, status } = req.body;

        const editColor = await ColorModal.findByIdAndUpdate({ _id: id }, { color, status }, { new: true });

        if (!editColor) {
            return res.status(400).send('Color not found');
        }
        res.status(200).send("Color updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports = { addColor, getColor, deleteColor, editColor }