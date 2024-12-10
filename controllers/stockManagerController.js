const StockManager = require("../models/stockManager");

const StockManagerController = {
    async createStockManager(req, res) {
        try {
            const manager = new StockManager(req.body);
            await manager.save();
            res.status(201).json(manager);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllStockManagers(req, res) {
        try {
            const managers = await StockManager.find().populate(["stocks", "supplies"]);
            res.status(200).json(managers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getStockManagerById(req, res) {
        try {
            const manager = await StockManager.findById(req.params.id).populate(["stocks", "supply"]);
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            res.status(200).json(manager);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateStockManager(req, res) {
        try {
            const manager = await StockManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            res.status(200).json(manager);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteStockManager(req, res) {
        try {
            const manager = await StockManager.findByIdAndDelete(req.params.id);
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            res.status(200).json({ message: "Stock manager deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async manageStock(req, res) {
        try {
            const { stockId } = req.body;
            const manager = await StockManager.findById(req.params.id);
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            await manager.manageStock(stockId);
            res.status(200).json({ message: "Stock managed successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async processOrder(req, res) {
        try {
            const { orderId } = req.body;
            const manager = await StockManager.findById(req.params.id);
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            await manager.processOrder(orderId);
            res.status(200).json({ message: "Order processed successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async handleSupply(req, res) {
        try {
            const { supplyId } = req.body;
            const manager = await StockManager.findById(req.params.id);
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            await manager.handleSupply(supplyId);
            res.status(200).json({ message: "Supply handled successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addressComplaint(req, res) {
        try {
            const { complaintId } = req.body;
            const manager = await StockManager.findById(req.params.id);
            if (!manager) {
                return res.status(404).json({ message: "Stock manager not found" });
            }
            await manager.addressComplaint(complaintId);
            res.status(200).json({ message: "Complaint addressed successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }    
};

module.exports = StockManagerController;
