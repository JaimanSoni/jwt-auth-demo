import userRouter from "./user.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", userRouter);

export default router;
