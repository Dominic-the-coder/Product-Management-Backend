const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoute");
const productRoutes = require("./routes/ProductRoute");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(express.json());

const cors = require("cors");

const corsHandler = cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

app.use(corsHandler);

mongoose
    .connect("mongodb://127.0.0.1:27017/jwt_with_products")
    .then(() => {
        app.listen(3000, () => {
            console.log("Express Server Started");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/user", userRoutes);


function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get("/dashboard", verifyToken, (req, res) => {
    res.send("You have reached a protected content!");
});
app.use("/product", productRoutes)