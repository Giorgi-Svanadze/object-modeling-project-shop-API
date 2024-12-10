const mongoose = require("mongoose");
const Order = require("./order");
const Complaint = require("./complaint");

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    loyaltyCard: { type: mongoose.Schema.Types.ObjectId, ref: "LoyaltyCard" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

CustomerSchema.methods.addOrder = async function (orderDetails) {
    const newOrder = await Order.create(orderDetails);

    this.orders.push(newOrder._id);
    await this.save();
    return this;
};

CustomerSchema.methods.fileComplaint = async function (orderId, complaintDetails) {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    const newComplaint = await Complaint.create(complaintDetails);
    order.complaint = newComplaint._id;
    await order.save();
    return this;
};

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
