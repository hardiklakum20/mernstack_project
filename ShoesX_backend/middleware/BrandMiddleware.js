const Joi = require('joi');

const brandMiddleware = (req, res, next) => {
    const schema = Joi.object({
        brand: Joi.required(),
        status: Joi.required(),
        categories: Joi.array().min(1).required(),
        image: Joi.required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

module.exports = { brandMiddleware }