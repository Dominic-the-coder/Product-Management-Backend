const mongoose = require("mongoose");
const Product = require("./models/Product");

// Sample Products Data
const products = [
    {
        name: "Wireless Bluetooth Headphones",
        description: "High-quality over-ear headphones with active noise cancellation and 30-hour battery life.",
        price: 89.99,
        category: "Electronics",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        name: "Smart Watch Series 7",
        description: "Fitness tracker with heart rate monitor, GPS, and water resistance up to 50m.",
        price: 299.99,
        category: "Electronics",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable 100% organic cotton t-shirt available in multiple colors.",
        price: 24.99,
        category: "Clothing",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
        name: "Classic Denim Jeans",
        description: "Timeless straight-fit denim jeans with a comfortable stretch fabric.",
        price: 59.99,
        category: "Clothing",
        inStock: false,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
    },
    {
        name: "Premium Coffee Beans",
        description: "Freshly roasted arabica coffee beans from Colombia. Medium roast with notes of chocolate and caramel.",
        price: 18.50,
        category: "Food",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400"
    },
    {
        name: "Artisan Chocolate Box",
        description: "Handcrafted assorted chocolates made with premium Belgian chocolate.",
        price: 32.00,
        category: "Food",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400"
    },
    {
        name: "The Art of Programming",
        description: "Comprehensive guide to software development best practices and design patterns.",
        price: 45.99,
        category: "Books",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
    },
    {
        name: "Mystery Novel Collection",
        description: "Box set of 3 bestselling mystery novels by acclaimed author Jane Peterson.",
        price: 34.99,
        category: "Books",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
    },
    {
        name: "Yoga Mat Pro",
        description: "Non-slip exercise mat with extra cushioning, perfect for yoga and pilates.",
        price: 39.99,
        category: "Sports",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"
    },
    {
        name: "Stainless Steel Water Bottle",
        description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
        price: 27.99,
        category: "Sports",
        inStock: false,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400"
    },
    {
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with customizable keys and macro support.",
        price: 129.99,
        category: "Electronics",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
    },
    {
        name: "Leather Laptop Bag",
        description: "Professional genuine leather messenger bag with padded laptop compartment.",
        price: 89.00,
        category: "Accessories",
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
];

// Connect to MongoDB and seed data
mongoose
    .connect("mongodb://127.0.0.1:27017/jwt_with_products")
    .then(async () => {
        console.log("Connected to MongoDB");
        
        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");
        
        // Insert new products
        await Product.insertMany(products);
        console.log("Successfully seeded 12 products!");
        console.log("Products added:");
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price} (${product.category})`);
        });
        
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error seeding database:", err);
        process.exit(1);
    });