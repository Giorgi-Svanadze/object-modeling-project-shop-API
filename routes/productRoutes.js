const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

router.put("/:id/updateStock", ProductController.updateStock);

module.exports = router;
