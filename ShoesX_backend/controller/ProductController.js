const ProductModal = require("../modal/ProductModal");


const addProduct = async (req, res) => {
    try {
        const { name, sku, brand, price, discount, status } = req.body;

        const existingProduct = await ProductModal.findOne({ sku, name });
        if (existingProduct) {
            return res.status(400).send('Product Already existed')
        }

        const newProduct = new ProductModal({ name, sku, brand, price, discount, status });
        await newProduct.save();

        res.status(200).send('Product added successfully');
    } catch (error) {

    }
}

const getProduct = async (req, res) => {
    try {
        const product = await ProductModal.find({}).sort({ createdAt: -1 }).populate('brand');
        res.status(200).json(
            {
                message: "Product fetched successfully",
                status: true,
                product
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await ProductModal.deleteOne({ _id: id });
        res.status(200).send('Delete Successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const editProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, sku, brand, price, discount, status } = req.body;

        const updateProduct = await ProductModal.findByIdAndUpdate({ _id: id }, { name, sku, brand, price, discount, status }, { new: true });

        if (!updateProduct) {
            return res.status(400).send('Product not found');
        }
        res.status(200).send("Product updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}
module.exports = { addProduct, getProduct, deleteProduct, editProduct }