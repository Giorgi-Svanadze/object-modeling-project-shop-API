const express = require("express");
const DeliveryAgentController = require("../controllers/deliveryAgentController");

const router = express.Router();

router.post("/", DeliveryAgentController.createDeliveryAgent);
router.get("/", DeliveryAgentController.getAllDeliveryAgents);
router.get("/:id", DeliveryAgentController.getDeliveryAgentById);
router.put("/:id", DeliveryAgentController.updateDeliveryAgent);
router.delete("/:id", DeliveryAgentController.deleteDeliveryAgent);

router.post("/:id/manageDelivery", DeliveryAgentController.manageDelivery);
router.patch("/:id/updateDeliveryStatus", DeliveryAgentController.updateDeliveryStatus);

module.exports = router;
