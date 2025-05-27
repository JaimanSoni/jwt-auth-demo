import { Router } from "express";
import { userController } from "../controllers/index.js";

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh-token", userController.refreshAccessToken);
userRouter.post("/forget-password", userController.forgetPassword);
userRouter.post("/reset-password/:token", userController.resetPassword);

export default userRouter;
