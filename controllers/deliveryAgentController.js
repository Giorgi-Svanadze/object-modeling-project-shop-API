const DeliveryAgent = require("../models/deliveryAgent");

const DeliveryAgentController = {
    async createDeliveryAgent(req, res) {
        try {
            const agent = new DeliveryAgent(req.body);
            await agent.save();
            res.status(201).json(agent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllDeliveryAgents(req, res) {
        try {
            const agents = await DeliveryAgent.find().populate("deliveries");
            res.status(200).json(agents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getDeliveryAgentById(req, res) {
        try {
            const agent = await DeliveryAgent.findById(req.params.id).populate("deliveries");
            if (!agent) {
                return res.status(404).json({ message: "Delivery agent not found" });
            }
            res.status(200).json(agent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateDeliveryAgent(req, res) {
        try {
            const agent = await DeliveryAgent.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!agent) {
                return res.status(404).json({ message: "Delivery agent not found" });
            }
            res.status(200).json(agent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteDeliveryAgent(req, res) {
        try {
            const agent = await DeliveryAgent.findByIdAndDelete(req.params.id);
            if (!agent) {
                return res.status(404).json({ message: "Delivery agent not found" });
            }
            res.status(200).json({ message: "Delivery agent deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async manageDelivery(req, res) {
        try {
            const { deliveryId } = req.body;
            const agent = await DeliveryAgent.findById(req.params.id);
            if (!agent) {
                return res.status(404).json({ message: "Delivery agent not found" });
            }
            await agent.manageDelivery(deliveryId);
            res.status(200).json({ message: "Delivery managed successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async updateDeliveryStatus(req, res) {
        try {
            const { deliveryId, status } = req.body;
            const agent = await DeliveryAgent.findById(req.params.id);
            if (!agent) {
                return res.status(404).json({ message: "Delivery agent not found" });
            }
            await agent.updateDeliveryStatus(deliveryId, status);
            res.status(200).json({ message: "Delivery status updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = DeliveryAgentController;
