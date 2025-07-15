const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const registerSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        name: Joi.string().required()
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}
const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

const ChangePasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        currentPassword: Joi.string().min(4).required(),
        newPassword: Joi.string().min(4).required(),
        confirmPassword: Joi.string().min(4).valid(Joi.ref('newPassword')).required()
            .messages({ 'any.only': 'Confirm password must match new password' })
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}

const ensureAuthantication = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).send({ message: "Unauthorized" });
    try {
        const decode = Jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized, JWT Wrong or Expired " });
    }
}

const ForgotPasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}
const ResetPasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        newPassword: Joi.string().min(4).required(),
        confirmPassword: Joi.string().min(4).valid(Joi.ref('newPassword')).required()
            .messages({ 'any.only': 'Confirm password must match new password' })
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next();
}


module.exports = { registerSchema, loginSchema, ChangePasswordSchema, ensureAuthantication, ForgotPasswordSchema, ResetPasswordSchema };