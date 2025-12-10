const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// ----------------------
// SIGNUP
// ----------------------
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashed
        });

        res.json({ msg: "Signup successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// ----------------------
// SIGNIN
// ----------------------
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.json({ msg: "Signin successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

/// ----------------------
// FORGOT PASSWORD
// ----------------------
router.post('/forgot', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        // Create a 15-minute reset token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Correct reset URL for frontend
        const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const message = `
You requested to reset your password.

Click the link below to reset it:
${link}

This link expires in 15 minutes.
If you did not request this, ignore this email.
        `;

        await sendEmail(email, "Password Reset", message);

        res.json({ msg: "Password reset email sent" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// ----------------------
// RESET PASSWORD
// ----------------------
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const hashed = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(decoded.id, { password: hashed });

        res.json({ msg: "Password reset successful" });

    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Invalid or expired token" });
    }
});

module.exports = router;
