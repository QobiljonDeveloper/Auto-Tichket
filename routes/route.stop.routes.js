const {
    createRouteStop,
    findAllRouteStops,
    findRouteStopById,
    updateRouteStop,
    deleteRouteStop,
  } = require("../controllers/route.stop.controller");
  
  const router = require("express").Router();
  
  router.post("/", createRouteStop);
  router.get("/", findAllRouteStops);
  router.get("/:id", findRouteStopById);
  router.patch("/:id", updateRouteStop);
  router.delete("/:id", deleteRouteStop);
  
  module.exports = router;
  