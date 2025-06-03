const router = require("express").Router();

const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const userRoleRouter = require("./user.role.routes");
const authRouter = require("./auth.routes");

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/user-role", userRoleRouter);
router.use("/auth", authRouter);

module.exports = router;
