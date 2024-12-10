const express = require("express");
const DeliveryController = require("../controllers/deliveryController");

const router = express.Router();

router.post("/", DeliveryController.createDelivery);
router.get("/", DeliveryController.getAllDeliveries);
router.get("/:id", DeliveryController.getDeliveryById);
router.put("/:id", DeliveryController.updateDelivery);
router.delete("/:id", DeliveryController.deleteDelivery);

router.get("/:id/track", DeliveryController.trackDelivery);

module.exports = router;
