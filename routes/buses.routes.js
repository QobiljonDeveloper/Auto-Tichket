const {
  addBus,
  getAllBuses,
  getOneBusById,
  updateBus,
  deleteBus,
} = require("../controllers/buses.controller");

const router = require("express").Router();

router.post("/", addBus);
router.get("/", getAllBuses);
router.get("/:id", getOneBusById);
router.patch("/:id", updateBus);
router.delete("/:id", deleteBus);

module.exports = router;
