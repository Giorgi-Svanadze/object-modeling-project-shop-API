const mongoose = require("mongoose");

const LoyaltyCardSchema = new mongoose.Schema({
    points: { type: Number, required: true, default: 0 },
});

LoyaltyCardSchema.methods.redeemPoints = function (points) {
    if (this.points >= points) {
        this.points -= points;
    } else {
        throw new Error("Insufficient points");
    }
    return this.save();
};

LoyaltyCardSchema.methods.earnPoints = function (points) {
    this.points += points;
    return this.save();
};

const LoyaltyCard = mongoose.model("LoyaltyCard", LoyaltyCardSchema);
module.exports = LoyaltyCard;
