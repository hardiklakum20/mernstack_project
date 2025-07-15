const Joi = require("joi");

const ProductMiddleware = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        sku: Joi.string().required(),
        brand: Joi.string().required(),
        // category: Joi.string().required(),
        price: Joi.number().required(),
        discount: Joi.number().required(),
        status: Joi.number().required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

module.exports = ProductMiddleware