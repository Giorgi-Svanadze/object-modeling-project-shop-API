const express = require("express");
const StockManagerController = require("../controllers/stockManagerController");

const router = express.Router();

router.post("/", StockManagerController.createStockManager);
router.get("/", StockManagerController.getAllStockManagers);
router.get("/:id", StockManagerController.getStockManagerById);
router.put("/:id", StockManagerController.updateStockManager);
router.delete("/:id", StockManagerController.deleteStockManager);

router.post("/:id/manageStock", StockManagerController.manageStock);
router.post("/:id/processOrder", StockManagerController.processOrder);
router.post("/:id/handleSupply", StockManagerController.handleSupply);
router.post("/:id/addressComplaint", StockManagerController.addressComplaint);

module.exports = router;
