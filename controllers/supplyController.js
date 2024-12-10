const Supply = require("../models/supply");

const SupplyController = {
    async createSupply(req, res) {
        try {
            const supply = new Supply(req.body);
            await supply.save();
            res.status(201).json(supply);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllSupplies(req, res) {
        try {
            const supplies = await Supply.find().populate("product");
            res.status(200).json(supplies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSupplyById(req, res) {
        try {
            const supply = await Supply.findById(req.params.id).populate("product");
            if (!supply) {
                return res.status(404).json({ message: "Supply not found" });
            }
            res.status(200).json(supply);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateSupply(req, res) {
        try {
            const supply = await Supply.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!supply) {
                return res.status(404).json({ message: "Supply not found" });
            }
            res.status(200).json(supply);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteSupply(req, res) {
        try {
            const supply = await Supply.findByIdAndDelete(req.params.id);
            if (!supply) {
                return res.status(404).json({ message: "Supply not found" });
            }
            res.status(200).json({ message: "Supply deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = SupplyController;
