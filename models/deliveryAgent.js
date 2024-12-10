const mongoose = require("mongoose");
const Delivery = require("./delivery");

const DeliveryAgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    deliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }],
});

DeliveryAgentSchema.methods.manageDelivery = async function (deliveryId) {
    this.deliveries.push(deliveryId);
    return await this.save();
};

DeliveryAgentSchema.methods.updateDeliveryStatus = async function (deliveryId, status) {
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
        throw new Error("Delivery not found");
    }
    delivery.status = status;
    await delivery.save();
};

const DeliveryAgent = mongoose.model("DeliveryAgent", DeliveryAgentSchema);
module.exports = DeliveryAgent;
