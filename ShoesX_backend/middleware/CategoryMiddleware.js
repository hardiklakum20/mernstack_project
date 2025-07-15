const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const categoryMiddleware = (req, res, next) => {
    const schema = Joi.object({
        category: Joi.required(),
        status: Joi.required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

module.exports = categoryMiddleware