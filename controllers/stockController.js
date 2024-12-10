const Stock = require("../models/stock");

const StockController = {
    async createStock(req, res) {
        try {
            const stock = new Stock(req.body);
            await stock.save();
            res.status(201).json(stock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllStocks(req, res) {
        try {
            const stocks = await Stock.find();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getStockById(req, res) {
        try {
            const stock = await Stock.findById(req.params.id);
            if (!stock) {
                return res.status(404).json({ message: "Stock not found" });
            }
            res.status(200).json(stock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateStock(req, res) {
        try {
            const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!stock) {
                return res.status(404).json({ message: "Stock not found" });
            }
            res.status(200).json(stock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteStock(req, res) {
        try {
            const stock = await Stock.findByIdAndDelete(req.params.id);
            if (!stock) {
                return res.status(404).json({ message: "Stock not found" });
            }
            res.status(200).json({ message: "Stock deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = StockController;
