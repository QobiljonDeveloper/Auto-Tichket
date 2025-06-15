const {
  createPayment,
  findAllPayments,
  findPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/", createPayment);
router.get("/", findAllPayments);
router.get("/:id", findPaymentById);
router.patch("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
