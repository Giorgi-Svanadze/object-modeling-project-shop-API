const Order = require("../models/order");

const OrderController = {
    async createOrder(req, res) {
        try {
            const order = new Order(req.body);
            await order.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllOrders(req, res) {
        try {
            const orders = await Order.find().populate(["products", "complaint"]);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.id).populate(["products", "complaint"]);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateOrder(req, res) {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteOrder(req, res) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = OrderController;
