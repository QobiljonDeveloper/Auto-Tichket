const {
  createBusRoute,
  findAllBusRoutes,
  findBusRouteById,
  updateBusRoute,
  deleteBusRoute,
} = require("../controllers/bus.routes.controller");

const router = require("express").Router();

router.post("/", createBusRoute);
router.get("/", findAllBusRoutes);
router.patch("/:id", updateBusRoute);
router.delete("/:id", deleteBusRoute);
router.get("/:id", findBusRouteById);

module.exports = router;
