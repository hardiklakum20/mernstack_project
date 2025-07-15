const express = require("express");
const { register, login, changePassword, forgotPassword, resetPassword } = require("../controller/AuthController");
const { ChangePasswordSchema, registerSchema, loginSchema, ensureAuthantication, ForgotPasswordSchema, ResetPasswordSchema } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post('/register', registerSchema, register)
router.post('/login', loginSchema, login)
router.post('/change-password', ensureAuthantication, ChangePasswordSchema, changePassword)
router.post('/forgot-password', ForgotPasswordSchema, forgotPassword)
router.post('/reset-password/:token', ResetPasswordSchema, resetPassword)

module.exports = router