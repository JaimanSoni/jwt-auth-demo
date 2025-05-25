const userRouter = require("./user.routes");
const router = require("express").Router();

router.use("/auth", userRouter);

export = router;