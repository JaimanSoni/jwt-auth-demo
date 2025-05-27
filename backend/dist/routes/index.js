"use strict";
const userRouter = require("./user.routes");
const router = require("express").Router();
router.use("/auth", userRouter);
module.exports = router;
