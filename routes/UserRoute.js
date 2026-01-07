const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * POST /user/register
 */
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
        });

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/getAllUserDetails", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * POST /user/login
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "b6cb51bb316247931eeb66d77c7cb2a72de62c19a7fb2a9b64da35843902424955cc77b9fd35efb19703ba76628897041856e60eb4f3e7445233b3269adec5ec", { expiresIn: "30m" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;