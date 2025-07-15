const BrandModal = require("../modal/BrandModal");


const addBrand = async (req, res) => {
    try {
        const { brand, status, categories } = req.body;
        const image = `/public/images/${req.file.filename}`;

        const existingBrand = await BrandModal.findOne({ brand });
        if (existingBrand) {
            return res.status(400).send('Brand Already existed')
        }

        const newBrand = new BrandModal({ brand, status, categories, image });
        await newBrand.save();

        res.status(200).send('Brand added successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getBrand = async (req, res) => {
    try {
        const brand = await BrandModal.find({}).sort({ createdAt: -1 }).populate('categories');
        res.status(200).json({
            message: "Brand fetched successfully",
            status: true,
            brand
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        await BrandModal.deleteOne({ _id: id });
        res.status(200).send('Delete Successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const editBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const { brand, status, categories, existingImage } = req.body;

        let imagePath;

        if (req.file) {
            imagePath = '/public/images/' + req.file.filename;
        } else if (existingImage) {
            imagePath = existingImage;
        } else {
            imagePath = null;
        }

        const updateBrand = await BrandModal.findByIdAndUpdate({ _id: id }, { brand, status, categories, image: imagePath }, { new: true });

        if (!updateBrand) {
            return res.status(400).send('Brand not found');
        }
        res.status(200).send("Brand updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports = { addBrand, getBrand, deleteBrand, editBrand }