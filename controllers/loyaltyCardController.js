const LoyaltyCard = require("../models/loyaltyCard");

const LoyaltyCardController = {
    async createLoyaltyCard(req, res) {
        try {
            const card = new LoyaltyCard(req.body);
            await card.save();
            res.status(201).json(card);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllLoyaltyCards(req, res) {
        try {
            const cards = await LoyaltyCard.find();
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getLoyaltyCardById(req, res) {
        try {
            const card = await LoyaltyCard.findById(req.params.id);
            if (!card) {
                return res.status(404).json({ message: "Loyalty card not found" });
            }
            res.status(200).json(card);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateLoyaltyCard(req, res) {
        try {
            const card = await LoyaltyCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!card) {
                return res.status(404).json({ message: "Loyalty card not found" });
            }
            res.status(200).json(card);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteLoyaltyCard(req, res) {
        try {
            const card = await LoyaltyCard.findByIdAndDelete(req.params.id);
            if (!card) {
                return res.status(404).json({ message: "Loyalty card not found" });
            }
            res.status(200).json({ message: "Loyalty card deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async redeemPoints(req, res) {
        try {
            const { points } = req.body;
            const card = await LoyaltyCard.findById(req.params.id);
            if (!card) {
                return res.status(404).json({ message: "Loyalty card not found" });
            }
            await card.redeemPoints(points);
            res.status(200).json({ message: "Points redeemed successfully", card });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async earnPoints(req, res) {
        try {
            const { points } = req.body;
            const card = await LoyaltyCard.findById(req.params.id);
            if (!card) {
                return res.status(404).json({ message: "Loyalty card not found" });
            }
            await card.earnPoints(points);
            res.status(200).json({ message: "Points added successfully", card });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = LoyaltyCardController;
