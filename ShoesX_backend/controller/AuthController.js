const AuthModal = require("../modal/AuthModal");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const AdminModal = require("../modal/AdminModal");
const UserModal = require("../modal/UserModal");


const defaultAdmin = async (req, res) => {
    try {
        const existingAdmin = await AdminModal.findOne({ username: "admin@gmail.com" });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);

            const newAdmin = new AdminModal({
                username: "admin@gmail.com",
                password: hashedPassword,
                role: "admin"
            });

            await newAdmin.save();
            console.log("Default admin created.");
            // res.status(200).send("Default admin created.");
        } else {
            console.log("Admin already exists.");
            // res.status(401).send("Admin already exists.");
        }
    } catch (error) {
        console.error("Error creating admin:", error);
        // res.status(401).send("Error creating admin:");
    }
}
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await AuthModal.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hexPassword = await bcrypt.hash(password, 10);
        const user = await new AuthModal({ name, email, password: hexPassword });
        await user.save();

        res.status(200).send('User Register Successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const login = async (req, res) => {
    await defaultAdmin();

    try {
        const { email, password } = req.body;

        let existingUser;
        let userRole = "user";

        // Check if admin is logging in
        if (email === "admin@gmail.com") {
            existingUser = await AdminModal.findOne({ username: email });
            userRole = "admin";
        } else {
            // First check in UserModal (role-based users)
            existingUser = await UserModal.findOne({ email });

            if (existingUser) {
                // Check if user is active (status should be 1 for active)
                if (existingUser.status !== 1) {
                    return res.status(400).send("User account is inactive");
                }
                userRole = existingUser.roleName; // Use the role name from UserModal
            } else {
                // If not found in UserModal, check in AuthModal (regular users)
                existingUser = await AuthModal.findOne({ email });
                userRole = "user";
            }
        }

        if (!existingUser) {
            return res.status(400).send("User does not exist");
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
            return res.status(400).send("Invalid Password");
        }

        // Create token payload with appropriate role information
        const tokenPayload = {
            id: existingUser._id,
            role: userRole,
            email: existingUser.email || existingUser.username
        };

        // If user is from UserModal, include permissions in token
        if (existingUser.roleName) {
            tokenPayload.permissions = existingUser.permissions;
            tokenPayload.name = existingUser.name;
        }

        const token = Jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Prepare response data
        const responseData = {
            message: `${userRole} Login Successfully`,
            token,
            existingUser: {
                _id: existingUser._id,
                email: existingUser.email || existingUser.username,
                role: userRole
            },
            role: userRole
        };

        // Include additional data for UserModal users
        if (existingUser.roleName) {
            responseData.existingUser.name = existingUser.name;
            responseData.existingUser.roleName = existingUser.roleName;
            responseData.existingUser.permissions = existingUser.permissions;
            responseData.existingUser.status = existingUser.status;
        }

        res.status(200).json(responseData);

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || "Login error");
    }
}


const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        const { currentPassword, newPassword } = req.body;

        const user = await AuthModal.findById(userId);
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        const comparePassword = await bcrypt.compare(currentPassword, user.password);
        if (!comparePassword) {
            return res.status(400).send("Invalid Current Password");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await AuthModal.findByIdAndUpdate(userId, { password: hashedNewPassword });

        res.status(200).send("Password changed successfully");

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or other email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,  // <-- ADD THIS LINE
    },
});

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await AuthModal.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.resetPasswordToken = token;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${token}`;

        const mailOptions = {
            from: 'hardiklakum80@gmail.com',
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>You requested a password reset.</p>
                <p>Click the button below to reset your password:</p>
                <a href="${resetLink}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none;">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Password reset link sent to your email",
            token,
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(400).send(error || "Something went wrong")
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await AuthModal.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.status(400).send("Invalid or expired token");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        await user.save();

        res.status(200).send("Password reset successfully");

    } catch (error) {
        console.log(error);
        res.status(400).send(error || "Something went wrong")
    }
}

module.exports = { register, login, changePassword, forgotPassword, resetPassword, defaultAdmin }