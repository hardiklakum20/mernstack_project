const Joi = require('joi');

const VarientMiddleware = (req, res, next) => {
    const schema = Joi.object({
        productName: Joi.string().required(),
        status: Joi.required(),
        color: Joi.required(),
        size: Joi.required(),
        price: Joi.number().required(),
        discount: Joi.number().required(),
        status: Joi.number().required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
};

module.exports = { VarientMiddleware };
