const express = require("express");
const ComplaintController = require("../controllers/complaintController");

const router = express.Router();

router.post("/", ComplaintController.createComplaint);
router.get("/", ComplaintController.getAllComplaints);
router.get("/:id", ComplaintController.getComplaintById);
router.put("/:id", ComplaintController.updateComplaint);
router.delete("/:id", ComplaintController.deleteComplaint);

router.patch("/:id/resolve", ComplaintController.resolveComplaint);

module.exports = router;
