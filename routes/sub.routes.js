const {
  createSubRoute,
  findAllSubRoutes,
  findSubRouteById,
  updateSubRoute,
  deleteSubRoute,
} = require("../controllers/sub.route.controller");

const router = require("express").Router();

router.post("/", createSubRoute);
router.get("/", findAllSubRoutes);
router.get("/:id", findSubRouteById);
router.patch("/:id", updateSubRoute);
router.delete("/:id", deleteSubRoute);

module.exports = router;
