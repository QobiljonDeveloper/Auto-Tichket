const {
  addDriver,
  getAllDrivers,
  getOneDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driver.controller");

const router = require("express").Router();

router.post("/", addDriver);
router.get("/", getAllDrivers);
router.get("/:id", getOneDriverById);
router.patch("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;
