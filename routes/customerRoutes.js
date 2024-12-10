const express = require("express");
const CustomerController = require("../controllers/customerController");

const router = express.Router();

router.post("/", CustomerController.createCustomer);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.put("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

router.post("/:id/addOrder", CustomerController.addOrder);
router.post("/:id/fileComplaint", CustomerController.fileComplaint);

module.exports = router;
