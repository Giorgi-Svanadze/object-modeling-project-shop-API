const Delivery = require("../models/delivery");

const DeliveryController = {
    async createDelivery(req, res) {
        try {
            const delivery = new Delivery(req.body);
            await delivery.save();
            res.status(201).json(delivery);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllDeliveries(req, res) {
        try {
            const deliveries = await Delivery.find().populate("order");
            res.status(200).json(deliveries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getDeliveryById(req, res) {
        try {
            const delivery = await Delivery.findById(req.params.id).populate("order");
            if (!delivery) {
                return res.status(404).json({ message: "Delivery not found" });
            }
            res.status(200).json(delivery);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateDelivery(req, res) {
        try {
            const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!delivery) {
                return res.status(404).json({ message: "Delivery not found" });
            }
            res.status(200).json(delivery);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteDelivery(req, res) {
        try {
            const delivery = await Delivery.findByIdAndDelete(req.params.id);
            if (!delivery) {
                return res.status(404).json({ message: "Delivery not found" });
            }
            res.status(200).json({ message: "Delivery deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async trackDelivery(req, res) {
        try {
            const delivery = await Delivery.findById(req.params.id);
            if (!delivery) {
                return res.status(404).json({ message: "Delivery not found" });
            }
            const trackingDetails = await delivery.trackDelivery();
            res.status(200).json(trackingDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = DeliveryController;
