const { addRole, getAllRoles, getById, updateRole, deleteRole } = require("../controllers/roles.controller");

const router = require("express").Router();

router.post("/", addRole);
router.get("/", getAllRoles);
router.get("/:id", getById);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
