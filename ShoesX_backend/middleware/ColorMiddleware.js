const Joi = require('joi');

const colorMiddleware = (req, res, next) => {
    const schema = Joi.object({
        color: Joi.string().required(),
        status: Joi.string().required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

module.exports = colorMiddleware