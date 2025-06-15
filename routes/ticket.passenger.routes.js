const {
  createTicketPassenger,
  findAllTicketPassengers,
  findTicketPassengerById,
  deleteTicketPassenger,
} = require("../controllers/tickets.controller");

const router = require("express").Router();

router.post("/", createTicketPassenger);
router.get("/", findAllTicketPassengers);
router.get("/:id", findTicketPassengerById);
router.delete("/:id", deleteTicketPassenger);

module.exports = router;
