const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
