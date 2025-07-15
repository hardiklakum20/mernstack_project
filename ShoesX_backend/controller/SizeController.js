const SizeModal = require("../modal/SizeModal");

const addSize = async (req, res) => {
    try {
        const { size, status } = req.body;

        const existingSize = await SizeModal.findOne({ size });

        if (existingSize) {
            return res.status(400).send({ message: 'Size already exists' });
        }

        const newSize = new SizeModal({ size, status });
        await newSize.save();

        res.status(200).send('Size added successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getSize = async (req, res) => {
    try {
        const size = await SizeModal.find().sort({ createdAt: -1 });
        res.status(200).json(
            {
                message: "Size fetched successfully",
                status: true,
                size
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteSize = async (req, res) => {
    try {
        const { id } = req.params;
        await SizeModal.deleteOne({ _id: id });
        res.status(200).send('Delete Successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const editSize = async (req, res) => {
    try {
        const { id } = req.params;
        const { size, status } = req.body;

        const updateSize = await SizeModal.findByIdAndUpdate({ _id: id }, { size, status }, { new: true });

        if (!updateSize) {
            return res.status(400).send('Size not found');
        }
        res.status(200).send("Size updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports = { addSize, getSize, deleteSize, editSize }