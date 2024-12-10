const mongoose = require("mongoose");
const Stock = require("./stock");
const Order = require("./order");
const Supply = require("./supply");
const Complaint = require("./complaint");

const StockManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stock" }],
});

StockManagerSchema.methods.manageStock = async function (stockId, quantity) {
    const stock = await Stock.findById(stockId);
    if (!stock) {
        throw new Error("Stock not found");
    }
    stock.quantity += quantity;
    await stock.save();
};

StockManagerSchema.methods.processOrder = async function (orderId) {
    const order = await Order.findById(orderId).populate("products");
    if (!order) {
        throw new Error("Order not found");
    }

    for (const product of order.products) {
        if (!product) {
            throw new Error("Product data missing in order");
        }

        const stock = await Stock.findOne({ productId: product._id });
        if (!stock || stock.quantity < 1) {
            throw new Error(`Insufficient stock for product ${product.name}`);
        }
        stock.quantity -= 1;
        await stock.save();
    }
};

StockManagerSchema.methods.handleSupply = async function (supplyId) {
    const supply = await Supply.findById(supplyId).populate("product");
    if (!supply) {
        throw new Error("Supply not found");
    }

    if (!supply.product) {
        throw new Error("Associated product not found");
    }

    const stock = await Stock.findOne({ productId: supply.product._id });
    if (stock) {
        stock.quantity += supply.quantity;
        await stock.save();
    } else {
        await Stock.create({
            productId: supply.product._id,
            quantity: supply.quantity,
            price: supply.product.price,
        });
    }
};

StockManagerSchema.methods.addressComplaint = async function (complaintId, status) {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
        throw new Error("Complaint not found");
    }
    complaint.status = status;
    await complaint.save();
};

const StockManager = mongoose.model("StockManager", StockManagerSchema);
module.exports = StockManager;
