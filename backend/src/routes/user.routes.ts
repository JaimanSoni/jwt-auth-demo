const userRouter = require("express").Router();
const { userController } = require("../controllers");

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh-token", userController.refreshAccessToken);
userRouter.post("/forget-password", userController.forgetPassword);
userRouter.post("/reset-password/:token", userController.resetPassword);

export = userRouter;
