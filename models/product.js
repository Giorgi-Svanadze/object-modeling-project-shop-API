const mongoose = require("mongoose");
const Stock = require("./stock");

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
});

ProductSchema.methods.updateStock = async function (quantity) {
    if (!this.stock) {
        throw new Error("Stock record is missing for this product");
    }
    const stock = await Stock.findById(this.stock);
    if (!stock) {
        throw new Error("Stock record not found");
    }
    stock.quantity += quantity;
    if (stock.quantity < 0) {
        throw new Error("Stock quantity cannot be negative");
    }
    await stock.save();
};

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
