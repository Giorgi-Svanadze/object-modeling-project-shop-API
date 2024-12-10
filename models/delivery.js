const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
    deliveryId: { type: String, required: true, unique: true },
    status: { type: String, required: true, default: "Pending" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
});

DeliverySchema.methods.trackDelivery = async function () {
    return {
        deliveryId: this.deliveryId,
        status: this.status,
        order: await this.populate("order"),
    };
};

const Delivery = mongoose.model("Delivery", DeliverySchema);
module.exports = Delivery;
