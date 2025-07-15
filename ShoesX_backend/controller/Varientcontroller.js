const Variant = require("../modal/VarientModal"); // Update path as needed

const addVariant = async (req, res) => {
    try {
        const { productId, productName, status, variants } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        // Parse variants if sent as JSON string (common when sent from Postman/form-data)
        const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;

        // Handle uploaded images
        const variantImages = {};
        req.files.forEach(file => {
            const match = file.fieldname.match(/variants\[(\d+)\]\.images/);
            if (match) {
                const index = parseInt(match[1]);
                if (!variantImages[index]) {
                    variantImages[index] = [];
                }
                variantImages[index].push(file.path); // or file.filename if using custom storage
            }
        });

        // Add images to each variant
        const updatedVariants = parsedVariants.map((variant, index) => ({
            ...variant,
            images: variantImages[index] || []
        }));

        const newVariant = new Variant({
            productId,
            productName,
            status,
            variants: updatedVariants
        });

        await newVariant.save();

        res.status(201).json({
            success: true,
            message: "Variant added successfully",
            data: newVariant
        });

    } catch (error) {
        console.error("Error adding variant:", error);
        res.status(500).json({
            success: false,
            message: "Server error while adding variant",
            error: error.message
        });
    }
};

const getVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const variants = await Variant.find({ productId: id }).sort({ createdAt: -1 }).populate('variants.color').populate('variants.size');
        res.status(200).json(
            {
                message: "Variant fetched successfully",
                status: true,
                variants
            }
        );
    } catch (error) {
        console.error("Error fetching variants:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching variants",
            error: error.message
        });
    }
}

const deleteVariant = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedVariant = await Variant.findByIdAndDelete(id);
        if (!deletedVariant) {
            return res.status(404).json({ message: "Variant not found" });
        }
        res.status(200).json({ message: "Variant deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}

const editVariant = async (req, res) => {
    try {
        const { productId, productName, status, variants } = req.body;
        const { id } = req.params;

        // Parse variants if it's a string (e.g., from FormData)
        const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;

        // Handle uploaded images
        const variantImages = {};
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const match = file.fieldname.match(/variants\[(\d+)\]\.images/);
                if (match) {
                    const index = parseInt(match[1]);
                    if (!variantImages[index]) {
                        variantImages[index] = [];
                    }
                    variantImages[index].push(file.path);
                }
            });
        }

        // Process variants data
        const updatedVariants = parsedVariants.map((variant, index) => {
            // Get existing images and add new ones
            const existingImages = variant.images || [];
            const newImages = variantImages[index] || [];
            const allImages = [...existingImages, ...newImages];

            // Create the variant object with proper structure
            const variantData = {
                price: variant.price,
                stock: variant.stock,
                discount: variant.discount || 0,
                images: allImages
            };

            // Only add color and size if they exist and are valid ObjectIds
            if (variant.color && variant.color.trim() !== '' && variant.color !== 'null') {
                variantData.color = variant.color;
            }

            if (variant.size && variant.size.trim() !== '' && variant.size !== 'null') {
                variantData.size = variant.size;
            }

            // If updating existing variant, preserve the _id
            if (variant._id) {
                variantData._id = variant._id;
            }

            return variantData;
        });

        console.log('Updated variants:', JSON.stringify(updatedVariants, null, 2));

        // Validate that all variants have required fields
        const validationErrors = [];
        updatedVariants.forEach((variant, index) => {
            if (!variant.color) {
                validationErrors.push(`Variant ${index + 1}: Color is required`);
            }
            if (!variant.size) {
                validationErrors.push(`Variant ${index + 1}: Size is required`);
            }
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationErrors
            });
        }

        // Find and update the Variant document
        const updatedVariant = await Variant.findByIdAndUpdate(
            id,
            {
                productId,
                productName,
                status,
                variants: updatedVariants
            },
            { new: true, runValidators: true }
        );

        if (!updatedVariant) {
            return res.status(404).json({
                success: false,
                message: "Variant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            data: updatedVariant
        });

    } catch (error) {
        console.error("Error updating variant:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating variant",
            error: error.message
        });
    }
};
module.exports = { addVariant, getVariant, deleteVariant, editVariant };
