const express = require("express");
const SupplyController = require("../controllers/supplyController");

const router = express.Router();

router.post("/", SupplyController.createSupply);
router.get("/", SupplyController.getAllSupplies);
router.get("/:id", SupplyController.getSupplyById);
router.put("/:id", SupplyController.updateSupply);
router.delete("/:id", SupplyController.deleteSupply);

module.exports = router;
