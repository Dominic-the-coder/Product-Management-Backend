const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

const router = express.Router();

async function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "No token provided" });

        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Malformed token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

router.get("/", verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.patch("/edit/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid product ID" });

    const updateData = req.body;
    if (updateData.price !== undefined && updateData.price < 0) return res.status(400).json({ error: "Price must be positive" });

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
router.get("/categories", verifyToken, async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid product ID" });

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/new", verifyToken, async (req, res) => {
    const { name, price } = req.body;
    if (!name || price === undefined) return res.status(400).json({ error: "Name and Price are required" });

    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid product ID" });

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;