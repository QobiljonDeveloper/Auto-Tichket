const {
  createBusSchedule,
  findAllBusSchedules,
  findBusScheduleById,
  updateBusSchedule,
  deleteBusSchedule,
} = require("../controllers/bus_schedule.controller");

const router = require("express").Router();

router.post("/", createBusSchedule);
router.get("/", findAllBusSchedules);
router.get("/:id", findBusScheduleById);
router.patch("/:id", updateBusSchedule);
router.delete("/:id", deleteBusSchedule);

module.exports = router;
