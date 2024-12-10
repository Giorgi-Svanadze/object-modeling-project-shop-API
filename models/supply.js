const mongoose = require("mongoose");

const SupplySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    supplyDate: { type: String, required: true },
});

const Supply = mongoose.model("Supply", SupplySchema);
module.exports = Supply;
