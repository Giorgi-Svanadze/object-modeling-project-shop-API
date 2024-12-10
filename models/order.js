const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderDate: { type: String, required: true },
    deliveryDate: { type: String, required: true },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing",
    },
    complaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
