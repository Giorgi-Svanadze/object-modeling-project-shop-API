const express = require("express");
const StockController = require("../controllers/stockController");

const router = express.Router();

router.post("/", StockController.createStock);
router.get("/", StockController.getAllStocks);
router.get("/:id", StockController.getStockById);
router.put("/:id", StockController.updateStock);
router.delete("/:id", StockController.deleteStock);

module.exports = router;
