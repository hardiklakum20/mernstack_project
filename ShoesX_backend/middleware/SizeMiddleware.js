const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const sizeMiddleware = (req, res, next) => {
    const schema = Joi.object({
        size: Joi.required(),
        status: Joi.required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

module.exports = sizeMiddleware