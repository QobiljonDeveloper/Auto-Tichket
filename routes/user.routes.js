const { addUser, getAllUsers, updateUser, deleteUser, getOneUserById } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:id", getOneUserById);
router.patch ("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
