const express = require("express");
const LoyaltyCardController = require("../controllers/loyaltyCardController");

const router = express.Router();

router.post("/", LoyaltyCardController.createLoyaltyCard);
router.get("/", LoyaltyCardController.getAllLoyaltyCards);
router.get("/:id", LoyaltyCardController.getLoyaltyCardById);
router.put("/:id", LoyaltyCardController.updateLoyaltyCard);
router.delete("/:id", LoyaltyCardController.deleteLoyaltyCard);

router.patch("/:id/redeem", LoyaltyCardController.redeemPoints);
router.patch("/:id/earn", LoyaltyCardController.earnPoints);

module.exports = router;
