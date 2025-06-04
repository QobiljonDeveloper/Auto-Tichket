const {
  addBusDriver,
  getAllBusDrivers,
  getBusDriverById,
  deleteBusDriver,
} = require("../controllers/bus_driver.controller");

const router = require("express").Router();

router.post("/", addBusDriver);
router.get("/", getAllBusDrivers);
router.get("/:id", getBusDriverById);
router.post("/remove", deleteBusDriver);

module.exports = router;
