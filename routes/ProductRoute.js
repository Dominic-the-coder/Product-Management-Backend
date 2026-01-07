const express = require("express");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

const router = express.Router();

// --- Inline token verification middleware ---
async function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Expected format: "Bearer <token>"
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Malformed token" });
        }

        const decoded = jwt.verify(token, "b6cb51bb316247931eeb66d77c7cb2a72de62c19a7fb2a9b64da35843902424955cc77b9fd35efb19703ba76628897041856e60eb4f3e7445233b3269adec5ec");
        req.user = decoded; // attach user info to request
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

// --- Protected route: GET all products ---
router.get("/", verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// --- Protected route: GET single product by ID ---
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;